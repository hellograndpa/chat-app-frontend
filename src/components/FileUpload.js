import React from 'react';
import ImageUploader from 'react-images-upload';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    return (
      <ImageUploader
        withIcon={false}
        buttonText="Choose a new image"
        onChange={this.onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        singleImage={true}
        withPreview={true}
      />
    );
  }
}

export default FileUpload;
