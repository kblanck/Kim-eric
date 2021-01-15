// Create Component
class Create extends React.Component {
    render = () => {
        return <div id="create-trip-container">
            <h3>Add a Trip!</h3>

            <form onSubmit={this.props.handleSubmit}>

                <label htmlFor="name">Name</label>
                <br/>
                <input type="text" id="name" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="date">Dates to Travel</label>
                <br/>
                <input type="text" id="date" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="description">Description</label>
                <br/>
                <input type="text" id="description" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="image">Image</label>
                <br/>
                <input type="text" id="image" onChange={this.props.handleChange} />
                <br/>

                <input type="submit" value="Add This Trip" />

            </form>
        </div>
    }
}

// Show Component
class Show extends React.Component {
    render = () => {
        return <div id="show-trip-container">
                <ul>
                    {this.props.state.trips.map((trip) => {
                        return <li key={trip._id}>
                            <img src={trip.image} />
                            <br/>

                            <p>{trip.name}</p>
                            <br/>

                            <p>{trip.date}</p>
                            <br/>

                            <p>{trip.description}</p>
                            <br/>

                            <button value={trip._id} onClick={this.props.deleteTrip}>
                                Remove
                            </button>
                            <br/>


                        </li>
                    })}
                </ul>
        </div>
    }
}

// // Edit Component
// class Edit extends React.Component {
//     render = () => {
//         return <div id="edit-trip-container">
//                             <details>
//                                 <summary>Edit Trip Details</summary>
//                                 <form id={trip._id} onSubmit={this.updateTrip}>
//
//                                     <label htmlFor="name">Name</label>
//                                     <br/>
//                                     <input type="text" id="name" defaultValue={trip.name} onChange={this.handleChange}/>
//                                     <br/>
//
//                                     <label htmlFor="date">Date</label>
//                                     <br/>
//                                     <input type="text" id="date" defaultValue={trip.date} onChange={this.handleChange}/>
//                                     <br/>
//
//                                     <label htmlFor="description">Description</label>
//                                     <br/>
//                                     <input type="text" id="description" defaultValue={trip.description} onChange={this.handleChange}/>
//                                     <br/>
//
//                                     <label htmlFor="name">Image</label>
//                                     <br/>
//                                     <input type="text" id="image" defaultValue={trip.image} onChange={this.handleChange}/>
//                                     <br/>
//
//                                     <input type="submit" value="Update Details" />
//
//                                 </form>
//                             </details>
//                     </div>
//     }
// }


// Parent Component
class App extends React.Component {
    state = {
        name: '',
        date: '',
        description: '',
        image: '',
        trips: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/trips', this.state).then((response) => {
            this.setState({
                trips: response.data,
                name: '',
                date: '',
                description: '',
                image: ''
            })
            document.getElementById('name').value = ""
            document.getElementById('date').value = ""
            document.getElementById('description').value = ""
            document.getElementById('image').value = ""

        })
    }
    deleteTrip = (event) => {
        axios.delete('/trips/' + event.target.value).then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }
    componentDidMount = () => {
        axios.get('/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }
    render = () => {
        return <div>
            <h1>Trips on Trips</h1>

            <Create handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state}></Create>
            <hr/>
            <Show handleSubmit={this.handleSubmit} handleChange={this.handleChange} deleteTrip={this.deleteTrip} state={this.state}></Show>

        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
