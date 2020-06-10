# Gologolo_Final


When you open browser, you can create, edit, and delete logos. Also, while creating and editing, you can see how your logo will change. 
You can add text and image to logo, and can change color, border, size and etc.
If you connect to [http://localhost:3000/graphql] you can check your logos are saved correctly. You can also check does your logo well deleted, edited, and queried.
Use this code to check it.

These are sample query and mutations you can use.

query logos{
  logos {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
    width
    height
    xpos
    ypos
    images
    imxpos
    imypos
  	lastUpdate  
  }
}

mutation AddLogo{
   addLogo(
	text:"logo", 
	color:"#000000",
  	fontSize:32,
	backgroundColor:"#ffffff",
	borderColor:"#ffffff",
	borderRadius:4, 
	borderWidth:23, 
	padding:45, 
	margin:54,
	height:420,
  width:500,
    xpos:50,
    ypos:80,
    images:"https://img1.looper.com/img/gallery/things-only-adults-notice-in-spongebob-squarepants/intro-1579624947.jpg",
    imxpos:150,
    imypos:180
	) {
	_id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
    width
    height
    xpos
    ypos
    images
    imxpos
    imypos
    lastUpdate
	}
}

mutation removeLogo{
	removeLogo( id:"5ee10648536c9103c4721277"){
	_id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
    width
    height
    xpos
    ypos
    images
    imxpos
    imypos
    lastUpdate
	}
}

mutation updateLogo{
   updateLogo(
    id:"5ee06369536c9103c4721276",
	text:"logoss1111", 
	color:"#070740",
  	fontSize:50,
	backgroundColor:"#018743",
	borderColor:"#459731",
	borderRadius:45, 
	borderWidth:10, 
	padding:45, 
	margin:54,
	height:420,
  width:300,
    xpos:150,
    ypos:320,
    images:"https://img1.looper.com/img/gallery/things-only-adults-notice-in-spongebob-squarepants/intro-1579624947.jpg",
    imxpos:140,
    imypos:250
	) {
	_id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
    width
    height
    xpos
    ypos
    images
    imxpos
    imypos
    lastUpdate
	}
}
