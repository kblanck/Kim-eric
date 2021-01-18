// Create Component
class Create extends React.Component {
    render = () => {
        return <div>
            <h5>Add a Trip!</h5>
            <div id="create-trip-container">
                <div id="polaroid-square">
                    <form id="create" encType="multipart/form-data" onSubmit={this.props.handleSubmit}>
                        <label htmlFor="name">Where to?</label>
                        <br/>
                        <input type="text" id="name" value={this.props.state.name} onChange={this.props.handleChange} />
                        <br/>
                        <label htmlFor="date">Dates to Travel</label>
                        <br/>
                        <input type="date" id="date" value={this.props.state.date} onChange={this.props.handleChange} />
                        <br/>
                        <label htmlFor="image">Image</label>
                        <br/>
                        <input type="file" id="image" name="image" onChange={this.props.handleFileChange} />
                        <br/>
                        <label htmlFor="description">Notes</label>
                        <br/>
                        <textarea id="description" value={this.props.state.description} onChange={this.props.handleChange} />
                        <br/>
                        <input type="submit" value="Add This Trip" />
                    </form>
                </div>
            </div>
        </div>
    }
}
// Show Component
class Show extends React.Component {
    render = () => {
        return <ul id="show-trip-container">
                {this.props.state.trips.map((trip) => {
                    return <li key={trip._id}>
                        <img src={trip.image} />
                        <br/>

                        <strong>
                            {trip.name}
                        </strong>
                        <br/>
                        {trip.date}
                        <br/>

                        <div id="describe">
                            <h6>Notes</h6>
                            {trip.description}
                        </div>

                        <br/>
                        <Edit handleSubmit={this.props.handleSubmit} deleteTrip={this.props.deleteTrip} updateTripsArr={this.props.updateTripsArr} state={this.props.state} trip={trip}></Edit>
                        <Comment handleSubmit={this.props.handleSubmit} updateTripsArr={this.props.updateTripsArr} state={this.props.state} trip={trip}></Comment>
                        <button value={trip._id} onClick={this.props.deleteTrip}>
                            Remove
                        </button>

                    </li>
                })}
            </ul>
    }
}
// Edit Component
class Edit extends React.Component {
    handleEditChange = () => {
        this.props.trip[event.target.id] = event.target.value
    }
    updateTrip = (event) => {
        event.preventDefault()
        axios.put('/trips/' + event.target.id, this.props.trip).then((res) => {})
        this.props.updateTripsArr()
    }
    render = () => {
        return <div id="edit-trip-container">
            <details>
                <summary>Edit Trip Details</summary>
                <form id={this.props.trip._id} onSubmit={this.updateTrip}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" defaultValue={this.props.trip.name} onChange={this.handleEditChange}/>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" defaultValue={this.props.trip.date} onChange={this.handleEditChange}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" defaultValue={this.props.trip.description} onChange={this.handleEditChange}/>
                    <label htmlFor="name">Image</label>
                    <input type="text" id="image" defaultValue={this.props.trip.image} onChange={this.handleEditChange}/>
                    <input id="update-button" type="submit" value="Update Details" />
                </form>
            </details>
        </div>
    }
}
// Comment Component
class Comment extends React.Component {
    state = {
        commenter: '',
        comment: '',
    }
    handleCommentChange = () => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    addComment = (event) => {
        event.preventDefault()
        this.props.trip.comments.push(this.state)
        axios.put('/trips/' + event.target.id, this.props.trip).then((res) => {
            this.setState({
                commenter: '',
                comment: '',
            })
        })
        this.props.updateTripsArr()
    }
    render = () => {
        return <details>
            <summary>Add a Comment! &#128077;</summary>
            <form id={this.props.trip._id} onSubmit={this.addComment}>
                <label htmlFor="commenter">Name</label>
                <input type="text" id="commenter" onChange={this.handleCommentChange} value={this.state.commenter}/>
                <label htmlFor="comment">Comment</label>
                <input type="text" id="comment" onChange={this.handleCommentChange} value={this.state.comment}/>
                <input id="update-button" type="submit" value="Add Your Comment" />
            </form>
            <ul id="comment-list">
                {this.props.trip.comments.map((comment) => {
                    return <li key={comment._id}>
                        <p>{comment.commenter}: {comment.comment}</p>
                    </li>
                })}
            </ul>
        </details>
    }
}
// Parent Component
class App extends React.Component {
    state = {
        name: '',
        date: '',
        description: '',
        image: null,
        trips: [],
        comments: [],
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleFileChange = (event) => {
        this.setState({
            image: event.target.files[0],
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('date', this.state.date)
        formData.append('description', this.state.description)
        formData.append('image', this.state.image)
        axios
            .post('/trips', formData, {headers: {'Content-Type': 'form-data'}})
            .then((res) => {
                this.setState({
                    trips: res.data,
                    name: '',
                    date: '',
                    description: '',
                    image: null
                })
            })
    }
    updateTripsArr = (event) => {
        axios.get('/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }
    addCommentArr = (event) => {
        axios.get('/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }
    deleteTrip = (event) => {
        if (confirm("Are you sure you want to delete?")) {
            axios.delete('/trips/' + event.target.value).then((res) => {
                this.setState({
                    trips: res.data
                })
            })
          } else {
            return;
          }
    }
    componentDidMount = () => {
        axios.get('/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }
    render = () => {
        return <div id="main-container">
            <h1>TRIPS ON TRIPS</h1>

            <div id="where">
                Where do we wanna go?
            </div>

            <div id="vaccine">
                (once we get the vaccine)
            </div>

            <Show handleSubmit={this.handleSubmit} handleChange={this.handleChange} deleteTrip={this.deleteTrip} updateTripsArr={this.updateTripsArr} state={this.state}></Show>
            <Create handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleFileChange={this.handleFileChange} state={this.state}></Create>
        </div>
    }
}
ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
$(() => {
    $("body").on("click", "#update-button",() => {
        $("details").removeAttr("open")
    })
})
