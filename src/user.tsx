import { useState } from "react";

const localStorageUserKey = "userName";

const loadUserName = (): string=> {
  const name = localStorage.getItem(localStorageUserKey);
  if (name === null || name.trim() === "") {
    return "";
  }
  return name;
};

const App = () => {
    const [userName, setUserName] = useState(loadUserName());
    const nowName = loadUserName()
    if(nowName === ""){
        const saveUserName = (name: string) => {
            localStorage.setItem(localStorageUserKey, name);
        };
        const moveToApp = (userName: string) => {
            saveUserName(userName);
            window.location.replace(import.meta.env.BASE_URL);
        }
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="py-10 px-20 rounded-full border-4 border-gray-300">
                    <div>
                        <h1 className="mb-4">ユーザー名を登録しましょう！</h1>
                        <form>
                            <input 
                                type="text" 
                                placeholder="ユーザー名" 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)}
                                className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            /><br/>
                            <button 
                                type="submit" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    moveToApp(userName);
                                }} 
                                disabled={userName.trim() === ""}
                                className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >登録</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    else{
        window.location.replace(import.meta.env.BASE_URL);
    }
}

export default App;