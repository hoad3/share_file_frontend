import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const API_URL = process.env.REACT_APP_API_URL;
console.log("Login URL:", process.env.REACT_APP_LOGIN_URL, "day la link2:", API_URL);
interface AuthState {
    user: any;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Thunk để gọi API đăng nhập

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ account, password }: { account: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/users/login?account=${account}&password=${password}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error("Đăng nhập thất bại!");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        logout: (state) => {
            state.user = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
