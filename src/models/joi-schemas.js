import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(),Joi.object()).description("a vaild id");

export const UserCredentialsSpec = Joi.object().keys({
  email: Joi.string().email().example("helga.beimer@ehrlich-reisen.de").required(),
  password: Joi.string().example("Hansemann").required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Helga").required(),
  lastName: Joi.string().example("Beimer").required(),
})
.label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
})
.label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlaceSpec = Joi.object()
  .keys({
    placename: Joi.string().example("Dublin").required(),
    latitude: Joi.number().min(-90).max(90).example(53.349801).required(),
    longitude: Joi.number().min(-180).max(180).example(-6.260296).required(),
    description: Joi.string().example("Ireland's capital city"),
    categoryid: IdSpec,
    categorytitle: Joi.string().example("Cities in Europe")
  })
  .label("PlaceDetails");

export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
})
.label("PlaceDetailsPlus");

export const PlaceArray = Joi.array().items(PlaceSpecPlus).label("PlaceArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().example("Pubs and Bars").required(),
    userid: IdSpec,
    places: PlaceArray,
  })
  .label("CategoryDetails");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
})
.label("CategoryDetailsPlus");

export const CategoryArray = Joi.array().items(CategorySpecPlus).label("CategoryArray");
  
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("xxxxx.yyyyy.zzzzz").required(),
  })
  .label("JwtAuth");