const { Sequelize, Model, DataTypes, Op, INTEGER } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});
//외래키 실습
//1.회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], //사용자 이름이 2자리부처 5자리까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //중복 허용 x
      validate: {
        isEmail: true, //이메일 형식이어야지만 들어올 수 있다.
      },
    },
    password: {
      // 단방향 암호화 bcrypt
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), //두 글자만 가능//ENUM:미리 정해둔 값만이 들어올 수 있다.
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);
//2. 게시판 모델 정의
const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
});
//3. 답변 모델을 추가해보겠습니다.
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);
User.hasMany(Post, {
  foreignKey: "authorId", //여기서는 FK 컬럼명 지정
});
Post.belongsTo(User, {
  foreignKey: "authorId",
});
//4. User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" }); //동일한 컬럼명 지정
Comment.belongsTo(User, { foreignKey: "userId" });
//5.Comment <-> Post
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Post, {
  foreignKey: "authorId", //여기서는 FK 컬렴명 지정
}); //1(User): N(Post)
Post.belongsTo(User, {
  foreignKey: "authorId",
}); //N(Post):1(User)
//post 테이블에 forgein key로 user 잡힌다.

(async () => {
  await sequelize.sync({ force: true });

  //Post 테이블에는 1명의 유저 ID 있다
  //데이터를 만들어야 합니다.

  //1.사용자 정보
  const user1 = await User.create({
    username: "홍길동",
    email: "hong1@email.com",
    password: "12345678",
    age: 40,
  });
  const user2 = await User.create({
    username: "트럼프",
    email: "trump@email.com",
    password: "12345678",
    age: 87,
  });
  //2.게시글 정보
  const post1 = await Post.create({
    title: "이란은 언제 공격을 중단할까요?",
    content: "니네들이 중단하면 우리도 중단한다.",
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "닭도리탕이 먹고싶어요 오늘저녁은...",
    content: "감자와 수제비도 넣어서 먹고 싶어여",
    authorId: user2.id,
  });

  const comment1 = await Comment.create({
    content: "저도 먹고 싶어요",
    userId: user1.id, //FK
    postId: post2.id, //FK
  });
  const comment2 = await Comment.create({
    content: "레시피를 공개해주세요",
    userId: user1.id, //FK
    postId: post2.id, //FK
  });
  const comment3 = await Comment.create({
    content: "시판양념 + 감자 + 닭다리 10개 + 양파 입니다.",
    userId: user1.id, //FK
    postId: post2.id, //FK
  });
  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });

  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users =>${JSON.stringify(users)}`);
})();
