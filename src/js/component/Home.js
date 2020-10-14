import React, { useState, useEffect } from "react";

function Home() {
	var [tiempo, setTiempo] = useState({
		seconds: 0,
		minutes: 0,
		hours: 0
	});
	var [pararEmpezar, setPararEmpezar] = useState(false);
	var [contador, setContador] = useState(false);
	var [acabar, setAcabar] = useState(false);

	useEffect(
		() => {
			if (document.hasFocus()) {
				if (pararEmpezar && !contador) {
					const id = setInterval(() => {
						if (tiempo.seconds < 59) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									seconds: tiempo.seconds + 1
								};
							});
						} else if (
							tiempo.seconds == 59 &&
							tiempo.minutes < 59
						) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									minutes: tiempo.minutes + 1,
									seconds: 0
								};
							});
						} else if (
							tiempo.seconds == 59 &&
							tiempo.minutes == 59
						) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									minutes: 0,
									seconds: 0,
									hours: tiempo.hours + 1
								};
							});
						}
					}, 1000);
					return () => clearInterval(id);
				}
				if (pararEmpezar && contador) {
					const idd = setInterval(() => {
						if (tiempo.seconds > 0) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									seconds: tiempo.seconds - 1
								};
							});
						} else if (tiempo.seconds == 0 && tiempo.minutes > 0) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									seconds: 59,
									minutes: tiempo.minutes - 1
								};
							});
						} else if (tiempo.seconds == 0 && tiempo.minutes == 0) {
							setTiempo(tiempo => {
								return {
									...tiempo,
									minutes: 59,
									seconds: 59,
									hours: tiempo.hours - 1
								};
							});
						}
						if (
							tiempo.hours == 0 &&
							tiempo.minutes == 0 &&
							tiempo.seconds == 0
						) {
							setAcabar((acabar = true));
						}
					}, 1000);
					return () => clearInterval(idd);
				}
			}
		},
		[pararEmpezar, contador, tiempo.seconds, tiempo.minutes, tiempo.hours]
	);
	const funcContador = evt => {
		const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		if (!numbers.includes(evt.key)) {
			evt.preventDefault();

			console.log(!numbers.includes(evt.key));
		}

		if (
			evt.key === "Enter" &&
			evt.target.value !== "" &&
			parseInt(evt.target.value) <= 995959
		) {
			var contadorNumeros = parseInt(evt.target.value);
			if (parseInt(contadorNumeros.toString().slice(-2)) > 59) {
				contadorNumeros = contadorNumeros + 40;
			}
			if (parseInt(contadorNumeros.toString().slice(-4, -2)) > 59) {
				contadorNumeros = contadorNumeros + 4000;
			}
			setTiempo(tiempo => {
				return {
					...tiempo,
					seconds:
						parseInt(contadorNumeros.toString().slice(-2)) || 0,
					minutes:
						parseInt(contadorNumeros.toString().slice(-4, -2)) || 0,
					hours:
						parseInt(contadorNumeros.toString().slice(-6, -4)) || 0
				};
			});
			setPararEmpezar((pararEmpezar = true));
			setContador((contador = true));
		}
	};

	console.log(
		tiempo.seconds.toString()[tiempo.seconds.toString().length - 2]
	);

	return (
		<>
			{!acabar ? (
				<div className="reloj">
					<div className="container-fluid">
						<div className="numerosRe fas fa-hourglass-half" />
						<div className="numeros">
							{tiempo.hours.toString()[
								tiempo.hours.toString().length - 2
							] || 0}
						</div>
						<div className="numeros">
							{tiempo.hours.toString()[
								tiempo.hours.toString().length - 1
							] || 0}
						</div>
						<div className="puntos">:</div>
						<div className="numeros">
							{tiempo.minutes.toString()[
								tiempo.minutes.toString().length - 2
							] || 0}
						</div>
						<div className="numeros">
							{tiempo.minutes.toString()[
								tiempo.minutes.toString().length - 1
							] || 0}
						</div>
						<div className="puntos">:</div>
						<div className="numeros">
							{tiempo.seconds.toString()[
								tiempo.seconds.toString().length - 2
							] || 0}
						</div>
						<div className="numeros">
							{tiempo.seconds.toString()[
								tiempo.seconds.toString().length - 1
							] || 0}
						</div>
					</div>
					<input
						type="text"
						className="contador"
						min="1"
						maxLength={6}
						placeholder="Añade un numero."
						onKeyPress={funcContador}
					/>
					<span>Max input 99:59:59</span>
					{pararEmpezar ? (
						<button
							className="fa fa-pause"
							onClick={() =>
								setPararEmpezar((pararEmpezar = false))
							}
						/>
					) : (
						<button
							className="fa fa-play"
							onClick={() =>
								setPararEmpezar((pararEmpezar = true))
							}
						/>
					)}
					<button
						className="fa fa-redo"
						onClick={() => {
							setTiempo(tiempo => {
								return {
									...tiempo,
									seconds: 0,
									minutes: 0,
									hours: 0
								};
							});

							setPararEmpezar((pararEmpezar = false));
							setContador((contador = false));
						}}
					/>
				</div>
			) : (
				<div className="tiempoOut">
					<h1>!! Fin !!</h1>
					<button
						className="fa fa-redo"
						onClick={() => {
							setTiempo(tiempo => {
								return {
									...tiempo,
									seconds: 0,
									minutes: 0,
									hours: 0
								};
							});
							setPararEmpezar((pararEmpezar = false));
							setContador((contador = false));
							setAcabar((acabar = false));
						}}
					/>
				</div>
			)}
		</>
	);
}

export default Home;
