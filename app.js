$(() => {
    const formulario = $("#formulario");
    const inputText = $("#inputText");
    const paises = $("#paises");
    const seleccion = $("#seleccion");

    let arrayPaises = [];

    $.ajax({
        url: "api.json",
        type: "GET",
        dataType: "JSON",
        success(data) {
            arrayPaises = data;
            pintarBanderas(data);
        },
        error(err) {
            console.log(err);
        },
    });

    const pintarBanderas = (data) => {
        paises.html("");
        data.forEach((element) => {
            paises.append(`
            <acticle class="col-12 col-md-3 mb-2">
                <div class="card">
                    <img height="100px" src="${element.flags.png}" alt="" class="card-img-top">
                    <div class="card-body">
                        <p>${element.name}</p>
                    </div>
                </div>
            </acticle>
            `);
        });
    };

    seleccion.on("change", () => {
        // console.log("cambio");
        // console.log(seleccion.val());
        if (seleccion.val() === "todos") {
            return pintarBanderas(arrayPaises);
        }
        const arrayFiltrado = arrayPaises.filter((item) => {
            if (item.region === seleccion.val()) {
                return item;
            }
        });
        pintarBanderas(arrayFiltrado);
    });

    formulario.on("keyup", (e) => {
        e.preventDefault();
        // console.log(inputText.val());
        const arrayFiltrado = arrayPaises.filter((item) => {
            const letraApi = item.name.toLowerCase();
            if (letraApi.indexOf(inputText.val()) !== -1) {
                return item;
            }
        });
        // console.log(arrayFiltrado);
        pintarBanderas(arrayFiltrado);
    });
});
