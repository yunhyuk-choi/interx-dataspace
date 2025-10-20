import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const dataPath = path.join(process.cwd(), "data", "data.json");

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("파일 읽기 오류:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("파일 쓰기 오류:", error);
  }
};

app.get("/api/data", (req, res) => {
  const data = readData();

  const { searchText, searchOption } = req.query;

  const searchedData =
    searchText && searchOption
      ? !(searchOption === "way" && searchText === "all")
        ? data.filter((item) => {
            const value = String(item[searchOption] ?? "").toLowerCase();
            return value.includes(String(searchText).toLowerCase());
          })
        : data
      : data;

  res.json(Object.groupBy(searchedData, ({ step }) => step));
});

app.post("/api/data", (req, res) => {
  const newItem = req.body;

  if (!newItem) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  const data = readData();
  const newId = data.at(-1).id + 1;
  data.push({ ...newItem, id: newId });
  writeData(data);

  res.status(201).json({ message: "지원자 정보가 추가되었습니다.", data });
});

app.put("/api/data", (req, res) => {
  const newItemId = req.body.id;

  const data = readData();
  const newData = data.map((item) => {
    if (item.id === newItemId) return req.body;
    return item;
  });

  writeData(newData);

  res.status(201).json({ message: "지원자 정보가 수정되었습니다.", newData });
});

app.delete("/api/data", (req, res) => {
  const deleteItemId = Number(req.body.id);
  const data = readData();
  const newData = data.filter((item) => item.id !== deleteItemId);
  writeData(newData);

  res.status(200).json({ message: "지원자 정보가 삭제되었습니다.", newData });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
