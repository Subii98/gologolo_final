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
    handleCanvas = (canvas) => {
  
        
        canvas.width = 500;
        canvas.height = 700;
     
        const ctx = canvas.getContext('2d');
     
        
        ctx.fillStyle = 'purple';
        ctx.textAlign="center";
        ctx.fillText("asd",200,80);
        
       }
    
    render() {
        
        // var thisIsMyCopy = ' <canvas   id= "myCanvas"  width="680" height="400" style="background-color:black; border-style:solid;border-color:rgb(255,255,0);"></canvas>';
        return (
            
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            
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
                                <div class="col-6"> <div style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}>
                                                    {data.logo.text}
                                                    
                                                </div>
                                                {/* <canvas id="myCanvas" ref={this.handleCanvas} style={{ backgroundColor:data.logo.backgroundColor}}> </canvas>
                                                <script>
                                                var canvas = document.getElementById("myCanvas");
                                                console.log(canvas);
                                                var ctx = canvas.getContext("2d");
                                                ctx.font = "18pt Rockwell";
                                                console.log(ctx);
                                                ctx.fillText("Hello, there!", 110, 110);
                                                ctx.fillStyle = "#00FFFF";
                                                ctx.fillText("Bye!!", 130, 130);
                                                </script> */}
                                    
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