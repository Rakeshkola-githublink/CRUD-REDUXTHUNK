import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://676cee870e299dd2ddfdde81.mockapi.io/crud");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching users');
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://676cee870e299dd2ddfdde81.mockapi.io/crud/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      return { id }; // Return only the id after deletion
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while deleting the user');
    }
  }
);

// Create a new user
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://676cee870e299dd2ddfdde81.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while creating the user');
    }
  }
);

// Update an existing user
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://676cee870e299dd2ddfdde81.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while updating the user');
    }
  }
);

// User slice
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: ' ', // Initialize as an empty string
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
