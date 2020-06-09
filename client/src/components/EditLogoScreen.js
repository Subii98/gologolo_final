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
                ypos:$ypos
                ) {
                    lastUpdate
                }
        }
`;

// Can change all information about logos
// Show logos and how it changes while editing
class EditLogoScreen extends Component {
    // constructor(props) {
    //     super(props);
    //     this.canvas = React.createRef();
    //     this.context = null // this will be initializaed in componentDidMount()
    //   }
    
    //   componentDidMount(){
        
    //     this.context = this.canvas.getContext("2d")
    //   }
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
   
    
       handleColorChange=(e)=>{
        
        this.setState({
            ncolor:e.target.value
            
        })
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var t =document.getElementById("colorinput");
        ctx.fillStyle = t.value;
        ctx.fillRect(0, 0, 100, 100);
        
    }
    handleTextChange=(e)=>{
        this.setState({
            ntext:e.target.value,    
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
        ctx.fillText(t.value, 150, 100);
        console.log(t.value);
    }
    handleBackgroundColorChange=(e)=>{
        this.setState({
            nbackgroundColor:e.target.value
        })
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var co =document.getElementById("backColor");
        //var t =document.getElementById("textinput");
        ctx.fillStyle = co.value;
        ctx.fillRect(0, 0, c.width, c.height);
        //ctx.fillText(t.value, 150, 100);
        //console.log(t.value);
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
    


    render() {
        
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width,height, xpos, ypos;
        
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
                        height: data.logo.height +"px"
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
                                                    xpos:parseInt(xpos.value), ypos:parseInt(ypos.value)
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
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" id="textinput"
                                                    onChange={this.handleTextChange}
                                                    // onChange={() => {data.logo.text = text.value; this.setState({
                                                    //     ntext:text.value,    
                                                    // }) }}  
                                                    className="form-control" name="text" ref={node => {
                                                        text = node;  
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
                                                    onChange={this.handleBackgroundColorChange}
                                                    // onChange={() => {data.logo.backgroundColor = backgroundColor.value; this.setState({nbackgroundColor:this.value});
                                                    //     this.setState({backgroundColor: this.value})}}
                                                        
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
                                                    className="form-control" name="borderColor" ref={node => {
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
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                        <div class="col-6"> 
                                                {/* <div style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}>
                                                {data.logo.text}</div>  */}
                                                
                                                {/* <canvas id="myCanvas"  style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}> </canvas>     */}
                                                
                                    <html>
                                    <body>
                                    
                                    {/* <canvas id="myCanvas"  style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}> </canvas>
                                                <canvas  draw={ctx => {ctx.fillText("DF",50,50)} }/> */}
                                    <canvas id="myCanvas"  ref="myCanvas"
                                    // style={{color:this.state.ncolor, backgroundColor:document.getElementById("backColor"), 
                                    // fontSize:this.state.nfontSize+"pt", borderColor:this.state.nborderColor, 
                                    // borderRadius:this.state.nborderRadius+"px",borderWidth:this.state.nborderWidth+"px",
                                    // padding:this.state.npadding+"px",margin:this.state.nmargin+"px", borderStyle:"solid",
                                    // }}
                                    style={styles}
                                    
                                    > </canvas>
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
