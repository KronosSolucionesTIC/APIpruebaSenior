class UsersGetDTO {
    constructor(id, document_type_id, document_number,first_name, last_name, date_birth, mobile_phone, email, address, city_id, session_active) {
      this.id = id;
      this.document_type_id = document_type_id,
      this.document_number = document_number,
      this.first_name = first_name;
      this.last_name = last_name;
      this.date_birth = date_birth;
      this.mobile_phone = mobile_phone;
      this.email = email;
      this.address = address;
      this.city_id = city_id;
      this.session_active = session_active;
    }

    static mapUsersGetData(data) {
      return data.map((user) => new UsersGetDTO(
        user.id, 
        user.document_type_id,
        user.document_number,
        user.first_name, 
        user.last_name, 
        user.date_birth,
        user.mobile_phone,  
        user.email,        
        user.address, 
        user.city_id,
        user.session_active
      ));
    }
  }
  
  module.exports = UsersGetDTO;