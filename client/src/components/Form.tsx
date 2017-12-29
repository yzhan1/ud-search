import * as React from 'react';

class Form extends React.Component {
    state = {searchWord: ''};

    onSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const searchField = document.getElementsByName('text')[0] as HTMLInputElement,
              searchText = searchField.value.trim();
        if (searchText.length < 2) {
            return;
        }
        fetch(`/api/define/${ searchText }`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
            });
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.onSubmit}>
                    <input name="text" ref="text" placeholder="Type to start searching"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default Form;