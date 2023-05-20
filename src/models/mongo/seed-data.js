export const seedData = {
  users: {
    _model: "User",
    carsten: {
      firstName: "Carsten",
      lastName: "Flöter",
      email: "carstenfloeter@praxisfloeter.de",
      password: "eschweiler"
    },
    berta: {
      firstName: "Berta",
      lastName: "Griese",
      email: "berta.g@klavierstunden.de",
      password: "manoel"
    },
    else: {
      firstName: "Else",
      lastName: "Kling",
      email: "else@iswas.de",
      password: "MeinLeiberEgon"
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
      categoryid: "->categories.pubs",
      categorytitle: "->categories.pubs.title",
      userid: "->users.carsten"
    },
    cafebelga: {
      placename: "Café Belga",
      latitude: 50.827044,
      longitude: 4.372525,
      description: "Cafe-bar, in the art deco Flagey center, with outdoor seating & guest DJs playing music until late.",
      categoryid: "->categories.pubs",
      categorytitle: "->categories.pubs.title",
      userid: "->users.carsten"
    },
    hema: {
      placename: "HEMA",
      latitude: 50.850507, 
      longitude: 4.353449,
      description: "A department store chain that sells everything you may need.",
      categoryid: "->categories.shops",
      categorytitle: "->categories.shops.title",
      userid: "->users.berta"
    },
  },
};