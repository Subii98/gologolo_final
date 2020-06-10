import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
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
            width
            height
            xpos
            ypos
            images
            imxpos
            imypos
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor : String!,
        $borderColor:String!,
        $borderRadius:Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin:Int!,
        $width: Int!,
        $height: Int!,
        $xpos : Int!,
        $ypos : Int!,
        $images:String!,
        $imxpos: Int!,
        $imypos:Int!
        ) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor:$borderColor,
                borderRadius:$borderRadius,
                borderWidth:$borderWidth,
                padding:$padding,
                margin:$margin,
                width:$width,
                height:$height,
                xpos:$xpos,
                ypos:$ypos,
                images : $images,
                imxpos:$imxpos,
                imypos:$imypos
                ) {
                    lastUpdate
                }
        }
`;

// Can change all information about logos
// Show logos and how it changes while editing
class EditLogoScreen extends Component {
    
    canvasElement = React.createRef();
    state={
        ncolor:"black",
        ntext: "",
        nfontSize: 10,
        nbackgroundColor: "black",
        nborderColor: "black",
        nborderRadius: 1,
        nborderWidth: 1,
        npadding: 1,
        nmargin: 1,
        nwidth: 300,
        nheight:200,
        nxpos :10,
        nypos : 10,
        nimages:"",
        nimxpos:1,
        nimypos:1 
    }
   
    
    // constructor(props) {
    //     super(props);
    //     this.canvas = React.createRef();
    //     this.context = null // this will be initializaed in componentDidMount()
    //   }
    // constructor(props){
    //     this.inputRef = React.createRef()
    //   }
    
    // constructor(props) {
    //     super(props);
    //     this.focusTextInput = this.focusTextInput.bind(this);
    //     this.focusTextInput.onload=function(){var canvas = document.getElementById("mcanvas");
    //         var ctx = canvas.getContext("2d");ctx.fillText("Hey there", 10, 10);}
    //   }
    //   focusTextInput() {
    //     // Explicitly focus the text input using the raw DOM API
    //     this.textInput.focus();
    //   }
    

    handleColorChange=(e)=>{
        
        this.setState({
            ncolor:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var t =document.getElementById("color");
        ctx.fillStyle = e.target.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
        
    }
    handleTextChange=(e)=>{
        this.setState({
            ntext:e.target.value,
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var co =document.getElementById("colorinput");
        var t =document.getElementById("textinput");
        ctx.fillStyle = co.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        ctx.fillText(t.value, this.state.nxpos, this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
    }
    addText=(e)=>{
        this.setState({
            ntext:e.target.value
        })
        this.setState({
            ncolor:e.target.value   
        })
        var c = document.getElementById("mCanvas");
        var ctx = c.getContext("2d");
        var co =document.getElementById("colorinput");
        var t =document.getElementById("textinput");
        ctx.fillStyle = co.value;
        ctx.fillText(t.value, 150, 100);
        console.log(t.value);
    }
    // handleBackgroundColorChange=(e)=>{
    //     this.setState({
    //         nbackgroundColor:e.target.value
    //     })
    // }
    handleBackgroundColorChange(e){
        this.setState({
            nbackgroundColor:e
        })
    }
    handleFontSizeChange=(e)=>{
        this.setState({
            nfontSize:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font = e.target.value+'px'+ ' Arial';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
    }
    handleBorderColorChange=(e)=>{
        this.setState({
            nborderColor:e.target.value
        })
    }
    handleBorderWidthChange=(e)=>{
        this.setState({
            nborderWidth:e.target.value
        })
    }
    handleBorderRadiusChange=(e)=>{
        this.setState({
            nborderRadius:e.target.value
        })
    }
    handlePaddingChange=(e)=>{
        this.setState({
            npadding:e.target.value
        })
    }
    handleMarginChange=(e)=>{
        this.setState({
            nmargin:e.target.value
        })
    }
    handleWidthChange=(e)=>{
        this.setState({
            nwidth:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.state.ncolor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
    }
    handleHeightChange=(e)=>{
        this.setState({
            nheight:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        
        ctx.fillStyle = this.state.ncolor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
        
    }
    handleXposChange=(e)=>{
        this.setState({
            nxpos:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var colorin =document.getElementById("colorinput");
        ctx.fillStyle = colorin.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        ctx.fillText(this.state.ntext, e.target.value, this.state.nypos);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
    }
    handleYposChange=(e)=>{
        this.setState({
            nypos:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var colorin =document.getElementById("colorinput");
        ctx.fillStyle = colorin.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        ctx.fillText(this.state.ntext,this.state.nxpos,e.target.value);
        const addimage = new Image();
        addimage.src = this.state.nimages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
    }
    handleImxposChange=(e)=>{
        this.setState({
            nimxpos:e.target.value
        })
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const addimage = new Image();
        var x= this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.src = this.state.nimages;
         addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
        
        var colorin =document.getElementById("colorinput");
        ctx.fillStyle = colorin.value; 
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
    }
    handleImyposChange=(e)=>{
        this.setState({
            nimypos:e.target.value
        })
        
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const addimage = new Image();
        var x= this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.src = this.state.nimages;
         addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
        
        var colorin =document.getElementById("colorinput");
        ctx.fillStyle = colorin.value; 
        ctx.fillText(this.state.ntext,this.state.nxpos,this.state.nypos);
        
    }
    handleImage=(e)=>{
        
        
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        
        this.setState({
            nimages:e.target.value
        })
        const addimage = new Image();
        var x= this.state.nimxpos;
        var y= this.state.nimypos;
        addimage.src = e.target.value;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,x,y)};
        
        

    }
    draw(address,xpo, ypo, x,y,z){
        
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var colortext =document.getElementById("colorinput");
        ctx.fillStyle=colortext.value;
        ctx.fillText(x,y,z);
        const addimage = new Image();
        
        addimage.src = address;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,xpo,ypo)};
        
        
    }
    render() {
        
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width,height, xpos, ypos, canvas,images,imxpos,imypos;
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    const styles = {
                        text:data.logo.text,
                        color: data.logo.color,
                        fontSize: data.logo.fontSize + "pt",
                        backgroundColor: data.logo.backgroundColor,
                        borderColor: data.logo.borderColor,
                        borderWidth: data.logo.borderThickness + "px",
                        borderRadius: data.logo.borderRadius + "px",
                        margin: data.logo.margin + "px",
                        padding: data.logo.padding + "px",
                        borderStyle:"solid",
                        width:data.logo.width + "px",
                        height: data.logo.height +"px",
                        xpos:data.logo.xpos + "px",
                        ypos:data.logo.ypos + "px"
                        }
                    
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        <div class="row"> 
                                        <div class="col-6">
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, 
                                                    fontSize: parseInt(fontSize.value), backgroundColor:backgroundColor.value, 
                                                    borderColor:borderColor.value, borderRadius:parseInt(borderRadius.value),
                                                    borderWidth:parseInt(borderWidth.value), padding:parseInt(padding.value), margin:parseInt(margin.value),
                                                    width:parseInt(width.value), height:parseInt(height.value),
                                                    xpos:parseInt(xpos.value), ypos:parseInt(ypos.value),images:images.value, imxpos:parseInt(imxpos.value),
                                                    imypos:parseInt(imypos.value)
                                                } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value="";
                                                borderColor.value="";
                                                borderRadius.value="";
                                                borderWidth.value ="";
                                                padding.value="";
                                                margin.value="";
                                                width.value="";
                                                height.value="";
                                                xpos.value="";
                                                ypos.value="";
                                                images.value="";
                                                imxpos.value="";
                                                imxpos.value="";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" id="textinput"
                                                    onChange={this.handleTextChange}
                                                    // onChange={() => {data.logo.text = text.value; this.setState({
                                                    //     ntext:text.value,    
                                                    // }) }}  
                                                    className="form-control" name="text" ref={node => {
                                                        text = node;  this.state.text = text;
                                                        //data.logo.text=node.value;
                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="xpos">Xpos:</label>
                                                    <input type="text" 
                                                    //onChange={this.handleHeightChange}
                                                    // onChange={() => {data.logo.height = height.value; 
                                                    // this.setState({nheight:this.value});
                                                    // this.setState({height: this.value})}} 
                                                    className="form-control" name="xpos" ref={node => {
                                                        xpos = node; 
                                                       // data.logo.height=height.value;
                                                    }} placeholder="xpos" defaultValue={data.logo.xpos} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ypos">Ypos:</label>
                                                    <input type="text" 
                                                    //onChange={this.handleHeightChange}
                                                    // onChange={() => {data.logo.height = height.value; 
                                                    // this.setState({nheight:this.value});
                                                    // this.setState({height: this.value})}} 
                                                    className="form-control" name="ypos" ref={node => {
                                                        ypos = node; 
                                                       // data.logo.height=height.value;
                                                    }} placeholder="ypos" defaultValue={data.logo.ypos} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color" >Color:</label>
                                                    <input type="color" id="colorinput"
                                                    onChange={this.handleColorChange} 
                                                    // onChange={() => {data.logo.color = color.value; this.setState({ncolor:this.value});
                                                    // this.setState({textColor: this.value})}} 
                                                    className="form-control" name="color" ref={node => {
                                                        color = node ; 
                                                        //data.logo.color = node.value;
                                                    }} placeholder="Color" defaultValue={data.logo.color}/> 
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" id="backColor"
                                                    // onChange={this.handleBackgroundColorChange}
                                                    onChange={() => {data.logo.backgroundColor = backgroundColor.value;
                                                        this.handleBackgroundColorChange(backgroundColor.value)}}
                                                        
                                                        className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;  
                                                        //data.logo.value=backgroundColor.value;
                                                    }} placeholder="backgroundColor" defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text"
                                                    onChange={this.handleFontSizeChange}
                                                    //  onChange={() => {data.logo.fontSize = fontSize.value; 
                                                    // this.setState({fontSize: this.value}); 
                                                    // this.setState({nfontSize:this.value})}
                                                     className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                        //data.logo.fontSize=fontSize.value;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" 
                                                    onChange={this.handleBorderColorChange}
                                                    // onChange={() => {data.logo.borderColor = borderColor.value; 
                                                    // this.setState({nborderColor:this.value});
                                                    // this.setState({borderColor: this.value})}} 
                                                    className="form-control" id="borderColor" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                        //data.logo.borderColor= borderColor.value;
                                                    }} placeholder="borderColor" defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" 
                                                     onChange={this.handleBorderRadiusChange}
                                                    // onChange={() => {data.logo.borderRadius = borderRadius.value; 
                                                    // this.setState({nborderRadius:this.value});
                                                    // this.setState({borderRadius: this.value})}} 
                                                     className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node; 
                                                        //data.logo.borderRadius=borderRadius.value;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="text" 
                                                    onChange={this.handleBorderWidthChange}
                                                    // onChange={() => {data.logo.borderWidth = borderWidth.value;
                                                    // this.setState({nborderWidth:this.value});
                                                    // this.setState({borderWidth: this.value})}} 
                                                    className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node; 
                                                        //data.logo.borderWidth=borderWidth.value;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" 
                                                    onChange={this.handlePaddingChange}
                                                    // onChange={() => {data.logo.padding = padding.value; 
                                                    // this.setState({npadding:this.value});
                                                    // this.setState({padding: this.value})}} 
                                                    className="form-control" name="padding" ref={node => {
                                                        padding = node; 
                                                       // data.logo.padding = padding.value;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="text" 
                                                     onChange={this.handleMarginChange}
                                                    // onChange={() => {data.logo.margin = margin.value;
                                                    // this.setState({nmargin:this.value});
                                                    // this.setState({margin: this.value})}} 
                                                    className="form-control" name="margin" ref={node => {
                                                        margin = node; 
                                                       // data.logo.margin = margin.value;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="text" 
                                                    onChange={this.handleWidthChange}
                                                    // onChange={() => {data.logo.width = width.value;
                                                    // this.setState({nwidth:this.value});
                                                    // this.setState({width: this.value})}} 
                                                    className="form-control" name="width" ref={node => {
                                                        width = node; 
                                                       // data.logo.width=width.value;
                                                    }} placeholder="Width" defaultValue={data.logo.width} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="text" 
                                                    onChange={this.handleHeightChange}
                                                    // onChange={() => {data.logo.height = height.value; 
                                                    // this.setState({nheight:this.value});
                                                    // this.setState({height: this.value})}} 
                                                    className="form-control" name="height" ref={node => {
                                                        height = node; 
                                                       // data.logo.height=height.value;
                                                    }} placeholder="Height" defaultValue={data.logo.height} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imxpos">Image width:</label>
                                                    <input type="number" id="imxpos" onChange={this.handleImxposChange}
                                                    className="form-control" name="imxpos" ref={node => {
                                                    imxpos = node;
                                                     }} placeholder="nimxpos" defaultValue={data.logo.imxpos}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imypos">Image height:</label>
                                                    <input type="number" id="imypos" onChange={this.handleImyposChange}
                                                    className="form-control" name="imypos" ref={node => {
                                                    imypos = node;
                                                    }} placeholder="imypos" defaultValue={data.logo.imypos}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="images">Image: </label>
                                                    <input type="text" id="images" name="images" ref={
                                                    node=> { images = node;}}
                                                    onChange = {this.handleImage} defaultValue={data.logo.images}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                        <div class="col-6"> 
           
                                    <html>
                                    <body>
                                    
                                    <canvas id="myCanvas" width={data.logo.width} height={data.logo.height}
                                    ref={node => {
                                    canvas = node; 
                                    
                                    this.draw(data.logo.images, data.logo.imxpos, data.logo.imypos, data.logo.text, data.logo.xpos, data.logo.ypos);
                                    }}
                                    
                                    style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                    borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                    borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                    margin:data.logo.margin+"px", borderStyle:"solid",
                                    text: data.logo.text
                                    }}
                                    // style={{color:this.state.ncolor, backgroundColor:this.state.nbackgroundColor, 
                                    //     fontSize:this.state.nfontSize+"pt", borderColor:this.state.nborderColor, 
                                    //     borderRadius:this.state.nborderRadius+"px",borderWidth:this.state.nborderWidth+"px",
                                    //     padding:this.state.npadding+"px",margin:this.state.nmargin+"px", borderStyle:"solid",
                                    //     }}
                                     ></canvas>
                                    
                                    </body>
                                    </html>
                                    
                                    
                                        </div> 
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                    
                }}
            </Query>
        );
        
    }
}

export default EditLogoScreen;
