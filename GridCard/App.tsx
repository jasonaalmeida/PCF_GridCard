import * as React from "react";

export interface IAttributeValue {
  attribute: string;
  value: string;
}

export interface IContactCard {
  key: string;
  values: IAttributeValue[];
}

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      clicks: 0
    };
  }

  render(){
    return (
      <p>Hello world</p>
    );
  }
};

// export class App(){
//   return (
//         <p>Hello world</p>
//   );
// };