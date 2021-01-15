// Create Component
class Create extends React.Component {
    render = () => {
        return <div id="create-trip-container">
            <h3>Add a Trip!</h3>

            <form id="create" onSubmit={this.props.handleSubmit}>

                <label htmlFor="name">Where to?</label>
                <br/>
                <input type="text" id="name" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="date">Dates to Travel</label>
                <br/>
                <input type="date" id="date" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="image">Image URL</label>
                <br/>
                <input type="text" id="image" onChange={this.props.handleChange} />
                <br/>

                <label htmlFor="description">Notes</label>
                <br/>
                <textarea id="description" onChange={this.props.handleChange} />
                <br/>

                <input type="submit" value="Add This Trip" />

            </form>
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

{/*
                        <h5>
                            Where to?
                        </h5>
                        <br/> */}

                        <strong>{trip.name}</strong>
                        <br/>

                        {trip.date}
                        <br/>

                        <h6 id="notes">
                            Notes
                        </h6>
                        <br/>

                        <span id="describe">
                            {trip.description}
                        </span>
                        <br/>

                        <button value={trip._id} onClick={this.props.deleteTrip}>
                            Remove
                        </button>
                        <br/>

                        <Edit handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} deleteTrip={this.props.deleteTrip} updateTrip={this.props.updateTrip} state={this.props.state} trip={trip}></Edit>
                    </li>
                })}
            </ul>
    }
}

// Edit Component
class Edit extends React.Component {
    render = () => {
        return <div id="edit-trip-container">
            <details>
                <summary>Edit Trip Details</summary>
                <form id={this.props.trip._id} onSubmit={this.props.updateTrip}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" defaultValue={this.props.trip.name} onChange={this.props.handleChange}/>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" defaultValue={this.props.trip.date} onChange={this.props.handleChange}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" defaultValue={this.props.trip.description} onChange={this.props.handleChange}/>
                    <label htmlFor="name">Image</label>
                    <input type="text" id="image" defaultValue={this.props.trip.image} onChange={this.props.handleChange}/>
                    <input id="update-button" type="submit" value="Update Details" />
                </form>
            </details>
        </div>
    }
}


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
    updateTrip = (event) => {
        event.preventDefault()
        axios.put('/trips/' + event.target.id, this.state).then((res) => {
            this.setState({
                trips: res.data,
                name: '',
                date: '',
                description: '',
                image: ''
            })
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
            <h1>Trips On Trips</h1>

            <Show handleSubmit={this.handleSubmit} handleChange={this.handleChange} deleteTrip={this.deleteTrip} updateTrip={this.updateTrip} state={this.state}></Show>

            <Create handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state}></Create>

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
