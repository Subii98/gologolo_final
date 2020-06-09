import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, withQuery } from "react-apollo";
import { Link } from 'react-router-dom';

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
        $ypos: Int!
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
            ypos : $ypos
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
        ntext: "gologolo",
        nfontSize: 10,
        nbackgroundColor: "white",
        nborderColor: "black",
        nborderRadius: 1,
        nborderWidth: 1,
        npadding: 1,
        nmargin: 1,
        nwidth: 1,
        nheight:1,
        nxpos :10,
        nypos : 10
        
    }
    // handleCanvas = (canvas) => {
  
        
    //     canvas.width = 200;
    //     canvas.height = 200;
     
    //     const ctx = canvas.getContext('2d');
     
        
    //     ctx.fillStyle = "white";
    //     ctx.textAlign="center";
    //     ctx.fillText(this.state.ntext,50,80);
        
    //    }
       componentDidMount(){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.fillText(this.state.ntext,50,80);
       }
    handleColorChange=(e)=>{
        
        this.setState({
            ncolor:e.target.value
            
        })
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var t =document.getElementById("textinput");
        ctx.fillStyle = t.value;
        ctx.fillText(this.state.ntext,50,80);
        
    }
    handleTextChange=(e)=>{
        
        // var newtextList = [];
        // newtextList.push(e.target.value);
        this.setState({
            ntext:e.target.value,
            ntextList: [e.target.value]
        })
        
    }
    addText=(e)=>{
        this.setState({
            ntext:e.target.value
        })
        this.setState({
            ncolor:e.target.value   
        })
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var co =document.getElementById("colorinput");
        var t =document.getElementById("textinput");
        ctx.fillStyle = co.value;
        ctx.fillText(t.value, 150, 10);
        console.log(t.value);
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
    }
    handleHeightChange=(e)=>{
        this.setState({
            nheight:e.target.value
        })
    }
    handleXposChange=(e)=>{
        this.setState({
            nxpos:e.target.value
        })
    }
    handleYposChange=(e)=>{
        this.setState({
            nypos:e.target.value
        })
    }
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height, xpos, ypos;
        
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
                                         xpos:parseInt(xpos.value), ypos:parseInt(ypos.value),
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
                                    
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" id="textinput"
                                         onChange={this.handleTextChange}
                                         className="form-control" name="text" ref={node => {
                                            text = node;
                                            
                                        }} placeholder="Text" />
                                        <button onClick={this.addText}>Add Text</button>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="xpos">xpos:</label>
                                        <input type="number" onChange={this.handleXposChange}
                                         className="form-control" name="xpos" ref={node => {
                                            xpos = node;
                                        }} placeholder="xpos" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ypos">ypos:</label>
                                        <input type="number" onChange={this.handleYposChange}
                                         className="form-control" name="ypos" ref={node => {
                                            ypos = node;
                                        }} placeholder="ypos" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" id="colorinput" onChange={this.handleColorChange}
                                         className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color"/>  
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background color:</label>
                                        <input type="color" onChange={this.handleBackgroundColorChange}
                                        className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="backgroundColor" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" onChange={this.handleFontSizeChange}
                                         className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" onChange={this.handleBorderColorChange}
                                         className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="borderColor" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onChange={this.handleBorderRadiusChange}
                                        className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onChange={this.handleBorderWidthChange}
                                        className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label> 
                                        <input type="number" onChange={this.handlePaddingChange}
                                         className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin Size:</label>
                                        <input type="number" onChange={this.handleMarginChange}
                                         className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="margin" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="width">Width Size:</label>
                                        <input type="number" onChange={this.handleWidthChange}
                                         className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} placeholder="width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="height">Height Size:</label>
                                        <input type="number" onChange={this.handleHeightChange}
                                         className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} placeholder="margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            </div>
                            <div class="col-6">
                            <div style={{color:this.state.ncolor, backgroundColor:this.state.nbackgroundColor, 
                                    fontSize:this.state.nfontSize+"pt", borderColor:this.state.nborderColor, 
                                    borderRadius:this.state.nborderRadius+"px",borderWidth:this.state.nborderWidth+"px",
                                    padding:this.state.npadding+"px",margin:this.state.nmargin+"px", borderStyle:"solid",
                                    text: this.state.ntext
                                    }}>{this.state.ntext}</div>
                                    <html>
                                    <body>
                                    <canvas id="myCanvas"  style={{color:this.state.ncolor, backgroundColor:this.state.nbackgroundColor, 
                                    fontSize:this.state.nfontSize+"pt", borderColor:this.state.nborderColor, 
                                    borderRadius:this.state.nborderRadius+"px",borderWidth:this.state.nborderWidth+"px",
                                    padding:this.state.npadding+"px",margin:this.state.nmargin+"px", borderStyle:"solid",
                                    }}> </canvas>
                                    
                                    </body>
                                    </html>
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