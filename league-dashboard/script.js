// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import fetch from "node-fetch";
// import cors from "cors";

// dotenv.config();

// const app = express();
// app.use(cors());

// const API_KEY = "RGAPI-08069c53-e698-4721-ac9e-c0f861d43798";
// const REGION = "na1"; // or other region
// const PLATFORM = "americas"; // for match-v5 endpoint

// // Get summoner by name
// app.get("/api/summoner/:name", async (req, res) => {
//   const name = req.params.name;
//   try {
//     const response = await fetch(
//       `https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch summoner data" });
//   }
// });

// // Get match history
// app.get("/api/matches/:puuid", async (req, res) => {
//   const puuid = req.params.puuid;
//   try {
//     const matchIdsResponse = await fetch(
//       `https://${PLATFORM}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`
//     );
//     const matchIds = await matchIdsResponse.json();

//     const matchDetails = await Promise.all(
//       matchIds.map(async (id) => {
//         const resp = await fetch(
//           `https://${PLATFORM}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
//         );
//         return resp.json();
//       })
//     );

//     res.json(matchDetails);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch matches" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = "RGAPI-7ac54d10-ff8c-4b48-8228-b8d425381f56";
const REGION = "americas"; // change this as needed

app.get("/api/summoner/:name/:tag", async (req, res) => {
  const name = req.params.name;
  const tag = req.params.tag;
  try {
    const response = await fetch(
      `https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch summoner data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching summoner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/summoner/:puuid", async (req, res, next) => {
  const puuid = req.params.puuid;
  const response = await fetch(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
  );
  const data = await response.json();
  res.json(data);
});

app.get("/api/summoner/matches/:puuid/:name", async (req, res) => {
  const puuid = req.params.puuid;
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`
  );

  // "~/yeU1gOR99kFasqUb3xGirzqAAgxPemB-m2ahJHD3Hye9QnGiwkzOzL67UYlbw7e1oXiHCNg2-XSD1Q/ids?start=0&count=20&api_key=RGAPI-08069c53-e698-4721-ac9e-c0f861d43798"
  const data = await response.json();
  res.json(data);
});

app.get("/api/summoner/matches/match/:matchid/:name", async (req, res) => {
  const matchid = req.params.matchid;
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${API_KEY}`
  );
  //https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5264814619?api_key=RGAPI-08069c53-e698-4721-ac9e-c0f861d43798
  const data = await response.json();
  res.json(data);
  // console.log(data);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

// import express from "express";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// // dotenv.config();

// let RIOT_API_KEY = "RGAPI-08069c53-e698-4721-ac9e-c0f861d43798";

// const app = express();
// const PORT = 3000;

// app.get("/api/summoner/:name", async (req, res) => {
//   const summonerName = req.params.name;
//   try {
//     const response = await fetch(
//       `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
//         summonerName
//       )}`,
//       {
//         headers: {
//           "X-Riot-Token": RIOT_API_KEY,
//         },
//       }
//     );

//     if (!response.ok) {
//       return res
//         .status(response.status)
//         .json({ error: "Error fetching summoner data" });
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
