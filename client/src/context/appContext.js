import { useEffect, useReducer, useContext } from "react";
import React from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  DISPLAY_ALERT,
  GET_FILTER_DATA,
  HANDLE_CHANGE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  TOGGLE_AMOUNT
} from "./action";
const url = 'https://course-api.com/react-useReducer-cart-project'
const initialState = {
  //Filter data
  proteinValue: 0,
  sugarValue: 0,
  selectedValue: 0,
  isActive: false,
  isVeganActive: false,

  // app
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  userLocation: localStorage.getItem("location"),
  // upgrade recipe plans
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "approved", "declined"],
  status: "pending",

  // search recipe container
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],

  // get jobs
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,

  //cart items
  loading: false,
  cart: [],//get data from backend
  total: 0,
  amount: 0,
  //favourites
  fav: []
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFilter = ({ proteinValue, sugarValue }) => {
    try {
      dispatch({
        type: GET_FILTER_DATA,
        payload: {
          proteinValue: proteinValue,
          sugarValue: sugarValue,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const authFetch = axios.create({
    baseURL: "http://localhost:4000/api/v1",
  });
  // request
  authFetch.interceptors.request.use(
    (config) => {
      console.log('authfetch its works');
      
      config.headers["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = (user, token, location) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = data;
      addUserToLocalStorage(user, token, location);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;
      addUserToLocalStorage(user, token, location);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

const setAuthCookies = (cookies)=>{
  axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.authToken}`;
  axios.defaults.headers.common['X-CSRF-Token'] = cookies.csrfToken;
}

  //cart items
  const addToCart = (item)=>{
    console.log('app');
    
    dispatch({type: 'ADD_TO_CART', payload: item})
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch()
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_AMOUNT, payload: { id, type } })
  }

  //favorites;
  useEffect(()=>{
    dispatch({type: 'GET_TOTALS'})
  },[state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        getFilter,
        loginUser,
        setAuthCookies,
        registerUser,
        clearValues,
        clearFilters,
        changePage,
        clearAlert,
        displayAlert,
        handleChange,
        //cart
        addToCart,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
