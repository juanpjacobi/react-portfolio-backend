import app from "./app/index.js";


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server corriendo en puerto ${port}`)
});
