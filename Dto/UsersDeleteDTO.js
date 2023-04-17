class UsersDeleteDTO {
    constructor(first_name, last_name, date_birth, email, mobile_phone, password, address) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.date_birth = date_birth;
      this.mobile_phone = mobile_phone;
      this.email = email;      
      this.password = password;
      this.address = address;
    }

    static mapUsersDeleteData(data) {
      return data.map((user) => new UsersDeleteDTO( 
        user.first_name, 
        user.last_name, 
        user.date_birth, 
        user.email, 
        user.mobile_phone, 
        user.password, 
        user.address
      ));
    }
  }
  
module.exports = UsersDeleteDTO;