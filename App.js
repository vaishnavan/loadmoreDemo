import axios from "axios";
import React from "react";
import Loader from "react-loader-spinner";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      visible: 5,
      loadingState: false
    };
  }

  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
        this.loadMoreItems();
      }
    });
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.setState({
        userData: res.data
      });
    });
  }

  loadMoreItems() {
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ visible: this.state.visible + 5, loadingState: false });
    }, 2000);
  }

  render() {
    const { userData, visible } = this.state;
    return (
      <>
        <div ref="iScroll" style={{ height: "500px", overflow: "auto" }}>
          {userData.slice(0, visible).map((user) => {
            return (
              <div key={user.id}>
                <h2>{user.body}</h2>
              </div>
            );
          })}
          {this.state.loadingState ? (
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}
