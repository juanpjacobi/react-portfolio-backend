import app from "./app/app.js";


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server corriendo en puerto ${port}`)
});
