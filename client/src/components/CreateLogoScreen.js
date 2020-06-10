import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, withQuery } from "react-apollo";
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

//$textList: [texts!]
const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,
        $width: Int!,
        $height: Int!,
        $xpos: Int!,
        $ypos: Int!,
        $images:String!,
        $imxpos: Int!,
        $imypos:Int!,
        ) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor : $backgroundColor,
            borderColor : $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin,
            width: $width,
            height: $height,
            xpos: $xpos,
            ypos : $ypos,
            images : $images,
            imxpos:$imxpos,
            imypos:$imypos
            ) {
            _id
        }
    }
`;

//Create logo with properties
//While creating, can see how logo changes

class CreateLogoScreen extends Component {
    
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
        nimxpos:20,
        nimypos:20
    }
    
    componentDidMount() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font="10px Arial";
        ctx.fillStyle=this.state.ncolor;
    }

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
   
    handleBackgroundColorChange=(e)=>{
        this.setState({
            nbackgroundColor:e.target.value
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
        canvas.width=e.target.value;
        canvas.height =this.state.nheight;
        var fo = document.getElementById("fontSize");
        ctx.font = fo.value+'px'+ ' Arial';
        var co =document.getElementById("colorinput");
        var t =document.getElementById("textinput");
        var xpo = document.getElementById("xpos");
        var ypo = document.getElementById("ypos");
        ctx.fillStyle = co.value;
        ctx.fillText(t.value, xpo.value, ypo.value);
        var img = document.getElementById("images");
        const addimage = new Image();
        addimage.src = img.value;
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
        canvas.height=e.target.value;
        canvas.width =this.state.nwidth;
        var fo = document.getElementById("fontSize");
        ctx.font = fo.value+'px'+ ' Arial';
        var co =document.getElementById("colorinput");
        var t =document.getElementById("textinput");
        var xpo = document.getElementById("xpos");
        var ypo = document.getElementById("ypos");
        ctx.fillStyle = co.value;
        ctx.fillText(t.value, xpo.value, ypo.value);
        var img = document.getElementById("images");
        const addimage = new Image();
        addimage.src = img.value;
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
    
    DownloadCanvasAsImage(){
        let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    var snapshot = document.getElementById('myCanvas'); 
    var context = snapshot.getContext('2d');
    let canvas = document.getElementById('myCanvas');
    snapshot.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
    }

    
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height, xpos, ypos, images,imxpos,imypos,canvas;
        
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div class="row"> 
                            <div class="col-6">
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                         backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                         borderRadius:parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                         padding:parseInt(padding.value), margin:parseInt(margin.value),
                                         width:parseInt(width.value), height : parseInt(height.value),
                                         xpos:parseInt(xpos.value), ypos:parseInt(ypos.value),images:images.value, imxpos:parseInt(imxpos.value),
                                         imypos:parseInt(imypos.value)
                                        } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value="";
                                    borderWidth.value = "";
                                    padding.value ="";
                                    margin.value = "";
                                    width.value = "";
                                    height.value = "";
                                    xpos.value="";
                                    ypos.value="";
                                    images.value="";
                                    imxpos.value="";
                                    imxpos.value="";
                                    
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="width">Width Size:</label>
                                        <input type="number" id="width" onChange={this.handleWidthChange}
                                         className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} placeholder="width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="height">Height Size:</label>
                                        <input type="number" id="height" onChange={this.handleHeightChange}
                                         className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} placeholder="height" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" id="textinput"
                                         onChange={this.handleTextChange}
                                         className="form-control" name="text" ref={node => {
                                            text = node;
                                            
                                        }} placeholder="Text" />
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="xpos">xpos:</label>
                                        <input type="number" id="xpos" onChange={this.handleXposChange}
                                         className="form-control" name="xpos" ref={node => {
                                            xpos = node;
                                        }} placeholder="xpos" defaultValue="0" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ypos">ypos:</label>
                                        <input type="number" id="ypos" onChange={this.handleYposChange}
                                         className="form-control" name="ypos" ref={node => {
                                            ypos = node;
                                        }} placeholder="ypos" defaultValue="0" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" id="color" id="colorinput" onChange={this.handleColorChange}
                                         className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color"/>  
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background color:</label>
                                        <input type="color" id="backgroundColor" onChange={this.handleBackgroundColorChange}
                                        className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="backgroundColor" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" id="fontSize" onChange={this.handleFontSizeChange}
                                         className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" id = "borderColor" onChange={this.handleBorderColorChange}
                                         className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="borderColor" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" id="borderRadius" onChange={this.handleBorderRadiusChange}
                                        className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" id="borderWidth" onChange={this.handleBorderWidthChange}
                                        className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label> 
                                        <input type="number" id = "padding" onChange={this.handlePaddingChange}
                                         className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin Size:</label>
                                        <input type="number" id="margin" onChange={this.handleMarginChange}
                                         className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="margin" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="imxpos">Image width:</label>
                                        <input type="number" id="imxpos" onChange={this.handleImxposChange}
                                         className="form-control" name="imxpos" ref={node => {
                                            imxpos = node;
                                        }} placeholder="nimxpos" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imypos">Image height:</label>
                                        <input type="number" id="imypos" onChange={this.handleImyposChange}
                                         className="form-control" name="imypos" ref={node => {
                                            imypos = node;
                                        }} placeholder="imypos" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="images">Image: </label>
                                        <input type="text" id="images" name="images" ref={
                                            node=> { images = node;}}
                                            onChange = {this.handleImage}
                                                />
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
                                    <canvas id="myCanvas" width={this.state.width} height={this.state.height}
                                    ref={node => {
                                        canvas = node; }}
                                    //width={this.state.nwidth} height={this.state.nheight}
                                     style={{color:this.state.ncolor, backgroundColor:this.state.nbackgroundColor,
                                        //width:this.state.nwidth, height:this.state.nheight, 
                                    fontSize:this.state.nfontSize+"pt", borderColor:this.state.nborderColor, 
                                    borderRadius:this.state.nborderRadius+"px",borderWidth:this.state.nborderWidth+"px",
                                    padding:this.state.npadding+"px",margin:this.state.nmargin+"px", borderStyle:"solid",
                                    }}> </canvas>
                                   
                                    
                                    </body>
                                    </html>
                                    
                                    <button onClick={this.DownloadCanvasAsImage}>Logo</button>
                                    
                                   
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;