import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubjectList } from '../../actions/AdminAction';
import { getTotal,getAllTutorials } from '../../actions/TutorialAction'

class Tutorials extends Component {
    constructor() {
        super();
        this.state = {
            subject: '',
            currentPage: 1,
            range: 12
            
        }
        this.onChange = this.onChange.bind(this);
        this.createPagination = this.createPagination.bind(this)
      
       
    }
    componentWillMount() {
        console.log("comp will mount")
        this.props.getTotal();
        this.props.getSubjectList();
        this.props.getAllTutorials(this.state.subject, Number(this.props.match.params.page)- 1 , this.state.range);
        this.setState({ currentPage: this.props.match.params.page })
    }
   
    createSelectSubject() {
        const list = this.props.tutorial.subjects;
        let listItems = [];
        if (list.length > 0) {
            list.map(subject => {
                listItems.push(
                    <option value={subject.id}>{subject.name}</option>
                )
                return null
            })
        }
        return listItems;
    }
    
    createPagination(maxPages) {
        let listItems = [];
       
        let page = 0;
        for (page; page < maxPages; page++) {
            listItems.push(
                <li class={"page-item " + ("" + this.state.currentPage === "" + (page + 1) ? "active" : "")}><a class="page-link text-dark" href={"/tutorials/"+(page+1)} >{page +1}</a></li>
            )
            
        }  
        return listItems;
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.props.getAllTutorials(e.target.value);

    }
    showTutorials() {
        const list = this.props.tutorial.list ? this.props.tutorial.list : [];
        let listItems = [];
        list.map(tutorial => {
            listItems.push(<div class="col-sm">


                <div id="post-frame-small">
                    <h1 class="title " >
                        <Link to={"/viewTutorial/" + tutorial.id}>
                            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '15px' }} >{tutorial.title}</span>
                        </Link>
                    </h1>
                    <div class="user-bar" >
                        <div class="photo" >
                            <Link to={"/profile/" + tutorial.teacher.id+"/1"}><img style={{ width: '40px', height: '40px' }} alt='' src={tutorial.teacher.userInfo.photo + ".png"} /></Link>
                        </div>
                        <div class="meat">
                            <span style={{ fontWeight: 'bold' }}>
                                <Link to={"/profile/" + tutorial.teacher.id}> @{tutorial.teacher.username} at {tutorial.createAt}</Link>
                            </span>
                            <span style={{ fontSize: '13px', color: 'black', fontWeight: 'bold' }}> {tutorial.nbrVisitor} views / {tutorial.nbrComment} comments</span>


                        </div>
                    </div>
                </div>


            </div>)
            return null
        })
        
     
        return listItems;
    }
    render() {
        console.log("render")
        const t = Number(this.props.tutorial.total)
        const numberOp = t / 4;
        const maxPages = t % 4 === 0 ? parseInt(numberOp) : parseInt(numberOp) + 1;
        
        return (
            <div >
                <h3 className="bold font22" style={{ color: "black" }}>Tutorials</h3>
                <div className='float-end '> <Link to="/newTutorial" class="btn  bold text-white" style={{backgroundColor:'#13BE00'}} >Add </Link></div>

                <div class="container">

                    <div   class="d-flex flex-row   justify-content-center  " style={{marginLeft:'5px'}}>
                        <b className='p-2'>Category:</b>
                        <div class="form-group ">
                            <select name='subject' class="form-control bg-dark text-white" value={this.state.subject} onChange={this.onChange}>
                                <option value='0' > All</option>
                                {this.createSelectSubject()}
                            </select>
                        </div>
                        
                    </div>
                    <ul class="d-flex flex-row   justify-content-start text-white" style={{ margin: '3px 0' }}>
                        {(this.state.currentPage !== '1') && <li class="page-item" ><a class="page-link text-dark " href={"/tutorials/" + (Number(this.state.currentPage) - 1)}>Previous</a></li>}
                         {this.createPagination(maxPages)}
                        {(this.state.currentPage !== '' + maxPages) && <li class="page-item"><a class="page-link text-dark" href={"/tutorials/" + (Number(this.state.currentPage) + 1)}>Next</a></li>}

                    </ul>
                    <div class="row">
                        {this.showTutorials()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    tutorial: state.tutorial,
    user: state.security

});

export default connect(mapStateToProps, { getTotal , getSubjectList , getAllTutorials })(Tutorials);
