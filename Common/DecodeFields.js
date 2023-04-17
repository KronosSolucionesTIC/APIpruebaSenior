class DecodeFields {
    constructor(fields) {
        this.fields = fields;
      }

    decode() {
        const decodedFields = this.fields.map(field => decodeURIComponent(field));
        return decodedFields;
    }
}

module.exports = DecodeFields