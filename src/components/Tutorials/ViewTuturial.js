/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTutorial, deleteQuestionnary, getTutorial, getContent } from '../../actions/TutorialAction';

import CommentList from '../Lists/CommentList';
import { Link } from 'react-router-dom'

class ViewTuturial extends Component {
    constructor() {
        super();
        this.state = {
            showQuestionnary: false,
        }
    }



    showQuestionnary() {
        this.setState({ showQuestionnary: !this.state.showQuestionnary });
    }
    componentWillMount() {
        this.props.getTutorial(this.props.match.params.id);
    }

    getDetails() {
        const tutorial = this.props.tutorial.selected.info;

        let details = {
            id: tutorial ? this.props.match.params.id : "",
            subjectName: tutorial ? tutorial.subject.name : "",
            allowedGroupes: tutorial ? tutorial.allowedGroupes : "",
            username: tutorial ? tutorial.teacher.username : "",
            owner: tutorial ? tutorial.teacher.id : 0,
            title: tutorial ? tutorial.title : "",
            content: tutorial ? tutorial.content : "",
            contentType: tutorial ? tutorial.contentType : 1,
            createAt: tutorial ? tutorial.createAt : "",
            nbrComment: tutorial ? tutorial.nbrComment : "",
            nbrVisitor: tutorial ? tutorial.nbrVisitor : "",
            photo: tutorial ?  tutorial.teacher.userInfo.photo : "",
            questionnary: tutorial.questionnary,
        }
        return details;
    }
    deleteQuestionnary(id) {
        this.props.deleteQuestionnary(id);
    }

    render() {
        const tutorial = this.props.tutorial.selected;
       
        if (tutorial && tutorial.errors) {
           return  <div>
            <section className="section_gap" >
                <div className="container" >
                    <div className="row" >
                        <div className="col-lg-12">
                            <div class="input-groupe btn-top align-right">
                                <Link to="/tutorials" class="arrowLeft left">Return to Tutorials list </Link>
                                <a href="" class="arrowRight"></a>
                            </div>
             <div class="alert alert-danger">
              
                {tutorial.errors.error}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
        }
        if (!tutorial) {
           return <div > </div>
       }
        const TutorialInfo = this.getDetails();

       

        return (
            
                    <div className="container" >
                        <div className="row" >
                            <div className="col">
                                <div class="d-flex flex-row   justify-content-start  ">
                                    <Link to="/tutorials/1" class="arrowLeft" style={{padding:'5px 0',color:'black'}}>Return to Tutorials list </Link>
                                   
                                </div>
                                <h3 className="badge text-dark" style={{backgroundColor:'#13be00',padding:'8px 3px',borderLeft:'10px solid black'}}>
                                        Category : <b class="text-white p-2">{TutorialInfo.subjectName}</b>     
                                </h3>

                                
                                <div id="post-frame">
                                    <h1 class="title">
                                        <a>
                                            <span style={{ color: 'black', fontWeight: 'bold' }} >{TutorialInfo.title}</span>
                                            {"" + this.props.user.user.id === "" + TutorialInfo.owner && <span class=" right btn btn-danger btn-sm " onClick={this.props.deleteTutorial.bind(this, TutorialInfo.id)} >delete</span>}
                                        </a>
                                        

                                    </h1>

                                    <div class="d-flex flex-wrap  justify-content-start">
                                    
 
                                        <span class="photo">
                                    <a href={"/profile/"+TutorialInfo.owner+"/1"}><img style={{ width:'60px',height:'60px'}} alt='' src={TutorialInfo.photo} /></a>
                                        </span>

                                        <span class="meat ">
                                            <h5>
                                                <a href="" style={{color:'black'}}>@{TutorialInfo.username}</a> 
                                                <span style={{fontSize:'14px',color:'black',fontWeight:'bold' }}> at {TutorialInfo.createAt} / {TutorialInfo.nbrVisitor} views</span>
                                            </h5>
                                           
                                            <span class="right">
                                           
                                                <a href="#" class="control comments-icon text-black bold">{TutorialInfo.nbrComment} comments</a>
                                            </span>
                                        </span>
                                        <div class="clear"></div>
                                    </div>
                                    {TutorialInfo.contentType === 1 && <div  dangerouslySetInnerHTML={{ __html: TutorialInfo.content }}></div>}
                                    {TutorialInfo.contentType === 2 && <object data={TutorialInfo.content} type="application/pdf" width="100%" height="800px">
                                        <p> Your Browser doesn't support Pdf viewer Please enable it Or download Pdf  </p>
                                        <div className="align-center">
                                            <div className="pdf_options">
                                                <a  className="bi bi-cloud-download-fill fa-lg"  href ={  TutorialInfo.content} ></a>
                                                <Link  className="bi bi-cloud-download-fill fa-lg" ></Link>
                                            </div>
                                        </div>
                                        </object>
                                    }
                                    <br />

                                    <hr class="dotted" />

                           
                                </div>
                                <br />
                                <br />
                                <CommentList parent={TutorialInfo.id} />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
              
        )
    }
}

const mapStateToProps = state => ({
    tutorial: state.tutorial,
    user: state.security
})
export default connect(mapStateToProps, { deleteTutorial, deleteQuestionnary, getContent, getTutorial })(ViewTuturial);
