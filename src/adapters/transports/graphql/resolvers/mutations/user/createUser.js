import userData from "../../../../../repositories/mocks/user.json" assert { type: "json" };

const createUserMutation = {
  createUser: (_, { input }) => {
    const data = {
      id: userData.length + 1,
      uuid: "",
      email: input.email,
      name: input.name,
      phone: input.phone,
      dob: input.dob,
      status: input.status,
      password: input.password,
      verified: true,
      created_by: "",
      updated_by: "",
      created_at: "",
      updated_at: "",
    };

    userData.push(data);

    return data;
  },
};

export default createUserMutation;
