document.addEventListener("DOMContentLoaded", function () {

    const usuariosAtivosElement = document.getElementById("usuariosAtivos");
    const totalImoveisElement = document.getElementById("totalImoveis");
    const visitasElement = document.getElementById("visitasAgendadas");

    const data = {
        success: true,
        usuariosAtivos: 124,
        totalImoveis: 58,
        visitasAgendadas: 18,
        visitasMensais: [10, 15, 18, 24, 27, 22, 31, 29, 26, 28, 32, 30]
    };

    if (data.success) {
        if (usuariosAtivosElement) {
            usuariosAtivosElement.textContent = data.usuariosAtivos;
        }

        if (totalImoveisElement) {
            totalImoveisElement.textContent = data.totalImoveis;
        }

        if (visitasElement) {
            visitasElement.textContent = data.visitasAgendadas;
        }

        const canvas = document.getElementById("grafico");

        if (canvas && data.visitasMensais) {
            new Chart(canvas.getContext("2d"), {
                type: "line",
                data: {
                    labels: [
                        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                    ],
                    datasets: [{
                        label: "Visitas aos Imóveis",
                        data: data.visitasMensais,
                        borderColor: "#e53935",
                        backgroundColor: "rgba(229, 57, 53, 0.2)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: "#e53935"
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: "#333",
                            titleColor: "#fff",
                            bodyColor: "#fff"
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "#555"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#555"
                            }
                        }
                    }
                }
            });
        }
    }

});