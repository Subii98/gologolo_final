import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
//add all logo properties
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
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;
//show all properties of logo
class ViewLogoScreen extends Component {
    state={
        ncolor:"black",
        ntext: "gologolo",
        nfontSize: 10,
        nbackgroundColor: "blue",
        nborderColor: "black",
        nborderRadius: 1,
        nborderWidth: 1,
        npadding: 1,
        nmargin: 1,
        nwidth: 1,
        nheight:1,
        //ntextList :[]
    }
    // componentDidMount(){
    //     // var canvas = document.getElementById('myCanvas');
    //     //  var context = canvas.getContext('2d');
      
    //     // //this.context.fillText("sd",20, 20);
    //     // context.fillText(this.state.ntext,50,80);
    //     const canvas = ReactDOM.findDOMNode(this.refs.canvas); 
    //     const context = canvas.getContext('2d');
    // }
   
    // constructor(props) {
    //     super(props);
    //     this.canvasRef = React.createRef();
    //   }
    //   componentDidUpdate() {
    //     const canvas = document.getElementById('myCanvas');
        
    //     //const canvas = this.canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    //     ctx.fillText("ldft",60,80);
        
    //   }
    
    
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height, xpos,ypos,canvas;
        //var thisIsMyCopy = ' <canvas   id= "myCanvas"  width="680" height="400" style="background-color:black; border-style:solid;border-color:rgb(255,255,0);"></canvas>';
        return (
            
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
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
                        <div className="container">
                            <div>
        
                         </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div class="row"> 
                                <div class="col-6"> 
                                <div className="panel-body">
                                {/* <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" id="textinput"
                                                    className="form-control" name="text" ref={node => { text = node;    
                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="xpos">Xpos:</label>
                                                    <input type="text"  className="form-control" name="xpos" ref={node => {xpos = node; }} placeholder="xpos" defaultValue={data.logo.xpos} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ypos">Ypos:</label>
                                                    <input type="text" 
                                                    className="form-control" name="ypos" ref={node => { ypos = node; }} placeholder="ypos" defaultValue={data.logo.ypos} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color" >Color:</label>
                                                    <input type="color" id="colorinput"
                                                    className="form-control" name="color" ref={node => {
                                                        color = node ; 
                                                    }} placeholder="Color" defaultValue={data.logo.color}/> 
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" id="backColor"
                                                        className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;   
                                                    }} placeholder="backgroundColor" defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text"
                                                     className="form-control" name="fontSize" ref={node => {fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" 
                                                    className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="borderColor" defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" 
                                                     className="form-control" name="borderRadius" ref={node => {borderRadius = node; 
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="text" 
                                                
                                                    className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node; 
                                                        
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" 
                                                    className="form-control" name="padding" ref={node => {
                                                        padding = node; 
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="text" 
                                                    className="form-control" name="margin" ref={node => {
                                                        margin = node; 
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="text"  
                                                    className="form-control" name="width" ref={node => {
                                                        width = node; 
                                                       
                                                    }} placeholder="Width" defaultValue={data.logo.width} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="text" 
                                                    className="form-control" name="height" ref={node => {
                                                        height = node; 
                                                    }} placeholder="Height" defaultValue={data.logo.height} />
                                                </div> */}

                                    <dl>
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text}</dd>
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                                </div> 
                                <div class="col-6"> 
                                                <div style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}>
                                                    {data.logo.text}
                                                    
                                                </div>
                                                
                                                <html>
                                                <body>
                                                <canvas id="myCanvas" ref={node => {canvas = node} } style={styles}> </canvas>
                                                {/* ref={node => {
                                                    canvas = node; 
                                                    var ctx = canvas.getContext("2d");
                                                    ctx.fillText("sd",12,13); }}
                                                  */}
                                                
                                                </body>
                                                </html>
                                </div>  
                                      
                                </div>
                            </div>
                        </div>
                        
                    );
                    
                    
                }}
            </Query>
            
        );
        
    }
    
}


export default ViewLogoScreen;