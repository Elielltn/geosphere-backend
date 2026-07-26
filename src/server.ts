import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/countries", async (req, res) => {
  try {
    let allData: any[] = [];
    let offset = 0;
    const limit = 100;
    let more = true;

    while (more) {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?response_fields=codes.alpha_2,names.translations.por,region,subregion,population,classification.dependency&limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${process.env.RESTCOUNTRIES_TOKEN}` } }
      );
      const json = await response.json();
      allData = [...allData, ...json.data.objects];
      more = json.data.meta.more;
      offset += limit;
    }

    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar países" });
  }
});

app.get("/api/countries/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?codes.alpha_2=${code}`,
      { headers: { Authorization: `Bearer ${process.env.RESTCOUNTRIES_TOKEN}` } }
    );
    const json = await response.json();
    res.json(json.data.objects[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar país" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});