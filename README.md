# Restcountries Práctica JQUERY
- [restcountries.com v2](https://restcountries.com/#api-endpoints-v2)
- [restcountries.com v3](https://restcountries.com/#api-endpoints-v3-all)
- [Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca)
- [cdn jquery](https://cdnjs.com/libraries/jquery)
- [proyecto final preview](https://priceless-northcutt-cc76f8.netlify.app/)

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>

    <div class="container my-5">

        <form id="formulario">
            <input id="inputText" type="text" class="form-control mb-2" placeholder="Busque país">
            <button type="submit" class="btn btn-primary mb-2">Buscar</button>
        </form>

        <form>
            <select class="form-select mb-2" id="seleccion">
                <option selected value="todos">Todos</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </form>

        <section class="row" id="paises">
            <acticle class="col-12 col-md-3 mb-2">
                <div class="card">
                    <img src="" alt="" class="card-img-top">
                    <div class="card-body">
                        <p>País</p>
                    </div>
                </div>
            </acticle>
        </section>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="app.js"></script>
</body>

</html>
```

```js
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
```