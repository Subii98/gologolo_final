var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;

//add all properties of logo

var textItemType = new GraphQLObjectType({
    name: 'textItem',
    fields: function () {
        return {
            textContent:{
                type: GraphQLString
            },
            xpos:{
                type:GraphQLInt
            },
            ypos:{
                type:GraphQLInt
            },
            textColor:{
                type: GraphQLString
            },
            textFont:{
                type: GraphQLString
            },
            textSize:{
                type: GraphQLInt
            }
        }
    }
});
var textItemInput = new GraphQLInputObjectType({
    name: 'textItemInput',
    fields: function () {
        return {
            textContent:{
                type: GraphQLString
            },
            xpos:{
                type:GraphQLInt
            },
            ypos:{
                type:GraphQLInt
            },
            textColor:{
                type: GraphQLString
            },
            textFont:{
                type: GraphQLString
            },
            textSize:{
                type: GraphQLInt
            }
        }
    }
});
var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            xpos:{
                type : GraphQLInt
            },
            ypos:{
                type : GraphQLInt
            },
            images:{
                type:GraphQLString
            },
            imxpos:{
                type : GraphQLInt
            },
            imypos:{
                type : GraphQLInt
            }
            // textList:{
            //     type: GraphQLList(textItemType)
            // }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().sort({lastUpdate:-1}).exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

//add logo and edit logo
var mutation = new GraphQLObjectType({
    
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    xpos: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    ypos: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    images:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    imxpos:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imypos:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                    // textList: {
                    //     type: new GraphQLList(textItemInput)
                    // }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    // textList:{
                    //     type: new GraphQLList(textType)
                    // }
                    xpos: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    ypos: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    images:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    imxpos:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imypos:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    
                    return LogoModel.findByIdAndUpdate(params.id, { text: params.text, color: params.color, fontSize: params.fontSize,
                         backgroundColor:params.backgroundColor,borderColor:params.borderColor, borderRadius: params.borderRadius,
                         borderWidth: params.borderWidth, padding: params.padding, 
                         margin:params.margin,
                         width:params.width,
                         height:params.height,
                         xpos:params.xpos,
                         ypos: params.ypos,
                         images:params.images,
                         imxpos: params.imxpos,
                         imypos:params.imypos,
                         //textList: params.textList,
                         lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });