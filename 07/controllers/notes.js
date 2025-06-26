const models = require("../models");
//모델에서 데이터를 조회하거나 수정, 추가, 삭제 전문하는
//함수만 모아 놓습니다.
//핸들러 함수

exports.getAllNotes = async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
};

exports.getNotes = async (req,res)=>{
    const tag = req.params.tag;
    const notes = await models.Note.findAll({
        where: {
            tag:tag,
        },
    });
    res.status(200).
}
