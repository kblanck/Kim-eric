class App extends React.Component {
    render = () => {
        return <div>
            <h1>Trips on Trips</h1>

            <section id="posted-trips">
                
            </section>
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)