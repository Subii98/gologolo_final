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
            xpos
            ypos
            images
            imxpos
            imypos
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
    
    draw(address,xpo,ypo,x,y,z){
        
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillText(x,y,z);
        const addimage = new Image();
        
        addimage.src = address;
        addimage.onload = function(){ctx.drawImage(addimage,100,100,xpo,ypo)};
    }
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height, xpos,ypos,canvas;
        
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
                        height: data.logo.height +"px",
                        xpos:data.logo.xpos + "px",
                        ypos:data.logo.ypos + "px"
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
                                        <dt>xpos</dt>
                                        <dd>{data.logo.xpos}</dd>
                                        <dt>ypos</dt>
                                        <dd>{data.logo.ypos}</dd>
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
                                                
                                                <html>
                                                <body>
                                                <canvas id="myCanvas" 
                                                width={data.logo.width} height={data.logo.height}
                                              
                                                ref={node => {canvas = node; 
                                                   
                                                    this.draw(data.logo.images, data.logo.imxpos, data.logo.imypos, data.logo.text, data.logo.xpos, data.logo.ypos);
                                            }}
                                            style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                            borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                            borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                            margin:data.logo.margin+"px", borderStyle:"solid",
                                            text: data.logo.text
                                            }} ></canvas>
                                                
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