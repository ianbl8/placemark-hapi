export const seedData = {
  users: {
    _model: "User",
    carsten: {
      firstName: "Carsten",
      lastName: "Flöter",
      email: "carstenfloeter@praxisfloeter.de",
      password: "$2a$12$0LxD.ItXgFR7SNu8Qr6/zOzeLsNAjwbgHjxuhrgrIPVtlUciUGaJq"
    },
    berta: {
      firstName: "Berta",
      lastName: "Griese",
      email: "berta.g@klavierstunden.de",
      password: "$2a$12$G5V6S7pTW5hcvaZ9Xf6e4uNkVv0/yu3CUkRnsoRM8pC8PHQq2PmQS"
    },
    else: {
      firstName: "Else",
      lastName: "Kling",
      email: "else@iswas.de",
      password: "$2a$12$SagLXxZaPoRKTACXiFWjCeW1jfk38cnVJXWnhGDcWZlHx.3dGAFky"
    },
  },
  categories: {
    _model: "Category",
    markets: {
      title: "Markets",
      userid: "->users.carsten"
    },
    pubs: {
      title: "Pubs",
      userid: "->users.carsten"
    },
    shops: {
      title: "Shops",
      userid: "->users.berta"
    },
  },
  places: {
    _model: "Place",
    zumschusterjungen: {
      placename: "Zum Schusterjungen",
      latitude: 52.540915,
      longitude: 13.414168,
      description: "Homestyle German classics like pork knuckle & schnitzel, plus beer, in an old-fashioned venue.",
      img: "http://res.cloudinary.com/dtucg3dli/image/upload/v1684583053/dbzl6si71djibpmtvena.jpg",
      categoryid: "->categories.pubs",
      categorytitle: "->categories.pubs.title",
      userid: "->users.carsten"
    },
    cafebelga: {
      placename: "Café Belga",
      latitude: 50.827044,
      longitude: 4.372525,
      description: "Cafe-bar, in the art deco Flagey center, with outdoor seating & guest DJs playing music until late.",
      img: "http://res.cloudinary.com/dtucg3dli/image/upload/v1684583073/ujrvceozfgsdklhe3ib5.jpg",
      categoryid: "->categories.pubs",
      categorytitle: "->categories.pubs.title",
      userid: "->users.carsten"
    },
    hema: {
      placename: "HEMA Monnaie/Munt",
      latitude: 50.850507, 
      longitude: 4.353449,
      description: "A department store chain that sells everything you may need.",
      img: "http://res.cloudinary.com/dtucg3dli/image/upload/v1684583117/u1qmsuderqlgzlker0r2.jpg",
      categoryid: "->categories.shops",
      categorytitle: "->categories.shops.title",
      userid: "->users.berta"
    },
  },
};