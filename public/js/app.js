class App extends React.Component {
    render = () => {
        return <div>
            <h1>Trips on Trips</h1>

            <section id="posted-trips">
                <ul>
                    {this.state.trips.map((trip) => {
                        return <li key={trip._id}>
                            <img src={trip.image} />
                            <br/>

                            {trip.name}
                            <br/>

                            {trip.date}
                            <br/>

                            {trip.description}
                            <br/>
 
                            <button value={trip._id} onClick={this.deleteTrip}>
                                Remove
                            </button>
                            <br/>

                            <details>
                                <summary>Edit Trip Details</summary>
                                <form id={trip._id} onSubmit={this.updateTrip}>
                                    
                                    <label htmlFor="name">Name</label>
                                    <br/>
                                    <input type="text" id="name" defaultValue={trip.name} onChange={this.handleChange}/>
                                    <br/>

                                    <label htmlFor="date">Date</label>
                                    <br/>
                                    <input type="text" id="date" defaultValue={trip.date} onChange={this.handleChange}/>
                                    <br/>

                                    <label htmlFor="description">Description</label>
                                    <br/>
                                    <input type="text" id="description" defaultValue={trip.description} onChange={this.handleChange}/>
                                    <br/>

                                    <label htmlFor="name">Image</label>
                                    <br/>
                                    <input type="text" id="image" defaultValue={trip.image} onChange={this.handleChange}/>
                                    <br/>

                                    <input type="submit" value="Update Details" />

                                </form>
                            </details>
                        </li>
                    }}
                </ul>
            </section>

        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)