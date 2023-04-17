class UsersUpdateDTO {
    constructor(first_name, last_name, date_birth, email, mobile_phone, password, address) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.date_birth = date_birth;
      this.mobile_phone = mobile_phone;
      this.email = email;      
      this.password = password;
      this.address = address;
    }

    static mapUserUpdateData(data) {
      return new UsersUpdateDTO(
        data.first_name, 
        data.last_name, 
        data.date_birth, 
        data.email, 
        data.mobile_phone, 
        data.password, 
        data.address
      );
    }
  }
  
module.exports = UsersUpdateDTO;