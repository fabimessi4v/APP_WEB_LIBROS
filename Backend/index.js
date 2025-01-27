import express from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"; // Replacing require with import
import cors from 'cors';
const app = express();

// Permitir solicitudes desde cualquier origen (o especificar el origen)
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());






/* Conexion a MONGODB ................................................ */

//Funcion encargada de conectarse a la bd
async function connectToDatabase() {
  const url = 'mongodb://0.0.0.0:27017/';
  const client = new MongoClient(url,);
  const ColeccionLibros= client.db("LIBROS_DB").collection("Libros");

//vamos a insertar un libro (POST)------------------------
app.post("/subir", async(req,res)=> {
    const data = req.body;
    const result =await ColeccionLibros.insertOne(data);
    res.send(result);
}
)
// fin de insertar libro------------------------------------


//vamos a obtener todos los libros (GET)------------------------
app.get("/libros", async(req,res)=> {
    const libros = ColeccionLibros.find();
    const result =await libros.toArray();
    res.send(result);
}
)
// fin de obtener libro------------------------------------

//UPDATE
app.patch("/libros/:id", async(req,res)=> {
    const id = req.params.id;
    const actualizarInfo =req.body;
    const filtro= {_id: new ObjectId(id)};
    const opciones= {upsert: true};
    const updateDoc={
        $set: {
            ...actualizarInfo
        }
    }
    const result =await ColeccionLibros.updateOne(filtro,updateDoc,opciones);
    res.send(result);
})
//DELETE
app.delete("/libros/:id", async(req,res)=> {
    const id = req.params.id;
    const actualizarInfo =req.body;
    const filtro= {_id: new ObjectId(id)};
    const result =await ColeccionLibros.deleteOne(filtro,);
    res.send(result);
})

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    //await client.close();
  }
}
connectToDatabase();