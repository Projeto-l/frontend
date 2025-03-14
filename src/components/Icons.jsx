export function Icon(props) {

    const icons = {
        user: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M226-262q59-39.666 121-60.833T480-344q71 0 133.333 21.167Q675.667-301.666 734.667-262q41-49.667 59.833-103.667 18.834-54 18.834-114.333 0-141-96.167-237.167T480-813.334q-141 0-237.167 96.167T146.666-480q0 60.333 19.167 114.333T226-262Zm253.876-184.667q-58.209 0-98.043-39.957Q342-526.581 342-584.791q0-58.209 39.957-98.042 39.958-39.834 98.167-39.834t98.043 39.958Q618-642.752 618-584.543q0 58.21-39.957 98.043-39.958 39.833-98.167 39.833ZM479.73-80q-83.097 0-156.183-31.5t-127.15-85.833q-54.064-54.334-85.23-127.227Q80-397.454 80-480.333q0-82.88 31.5-155.773Q143-709 197.333-763q54.334-54 127.227-85.5Q397.454-880 480.333-880q82.88 0 155.773 31.5Q709-817 763-763t85.5 127Q880-563 880-480.177q0 82.822-31.5 155.666T763-197.333Q709-143 635.914-111.5T479.73-80Z" /></svg>,
        users :<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>,
        email: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M146.666-160q-27 0-46.833-19.833T80-226.666v-506.668q0-27 19.833-46.833T146.666-800h666.668q27 0 46.833 19.833T880-733.334v506.668q0 27-19.833 46.833T813.334-160H146.666ZM480-454.667l333.334-215.334v-63.333L480-521.333 146.666-733.334v63.333L480-454.667Z" /></svg>,
        emailp: <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M146.666-160q-27 0-46.833-19.833T80-226.666v-506.668q0-27 19.833-46.833T146.666-800h666.668q27 0 46.833 19.833T880-733.334v506.668q0 27-19.833 46.833T813.334-160H146.666ZM480-454.667l333.334-215.334v-63.333L480-521.333 146.666-733.334v63.333L480-454.667Z" /></svg>,
        passwd: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M280-354q52.667 0 89.333-36.667Q406-427.333 406-480t-36.667-89.333Q332.667-606 280-606t-89.333 36.667Q154-532.667 154-480t36.667 89.333Q227.333-354 280-354Zm0 114q-100 0-170-70T40-480q0-100 70-170t170-70q83.667 0 142.167 46.333 58.5 46.334 81.833 117h341l75 75L788.667-331l-102-82.334L604-330.667l-74-74h-26q-21 74-82.667 119.334Q359.667-240 280-240Z" /></svg>,
        tel: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M796-120q-119 0-240-55.5T333-333Q231-435 175.5-556T120-796q0-18.667 12.667-31.333Q145.333-840 164-840h147.333q14 0 24.333 9.833Q346-820.333 349.333-806L376-675.334q2 14.667-.667 26Q372.666-638 364.666-630l-99 100q24 41.667 52.5 78.5T381-381.333q35 35.667 73.667 65.5T536-262.666l94.667-96.667q9.667-10.333 23.167-14.5 13.5-4.167 26.833-2.167L806-349.333q14.667 4 24.333 15.5Q840-322.333 840-308v144q0 18.667-12.667 31.333Q814.667-120 796-120Z" /></svg>,
        back: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>,
        heart: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>,
        heart_filled: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>,
        check: <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>,
        close_full_screen: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/></svg>,
        open_full_screen: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>,
        error: <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="40"><path d="M479.859-264.173q21.17 0 35.199-13.7 14.029-13.7 14.029-34.87 0-21.17-13.888-35.482-13.889-14.311-35.058-14.311-21.17 0-35.199 14.3-14.029 14.3-14.029 35.469 0 21.17 13.888 34.882 13.889 13.712 35.058 13.712Zm2.258-170.407q18.55 0 31.253-12.786t12.703-31.286v-171.261q0-18.5-12.82-31.287-12.82-12.786-31.37-12.786T450.63-681.2q-12.703 12.787-12.703 31.287v171.261q0 18.5 12.82 31.286 12.82 12.786 31.37 12.786Zm-1.888 370.407q-86.643 0-162.306-32.584Q242.26-129.34 185.8-185.8q-56.46-56.46-89.043-132.121-32.584-75.661-32.584-162.36 0-86.7 32.584-162.413 32.583-75.712 88.984-131.859 56.401-56.146 132.089-88.899 75.689-32.752 162.42-32.752t162.488 32.723q75.758 32.723 131.876 88.82 56.118 56.096 88.854 131.93 32.736 75.835 32.736 162.554 0 86.695-32.752 162.352-32.753 75.656-88.899 131.948-56.147 56.291-131.914 88.998-75.767 32.706-162.41 32.706Zm.104-88.146q136.74 0 232.044-95.401t95.304-232.613q0-136.74-95.179-232.044t-232.69-95.304q-136.595 0-232.044 95.179-95.449 95.179-95.449 232.69 0 136.595 95.401 232.044 95.401 95.449 232.613 95.449ZM480-480Z" /></svg>,
        calculator: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>,
        prescriptions: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m200-120-80-480h720l-80 480H200Zm67-80h426l51-320H216l51 320Zm133-160h160q17 0 28.5-11.5T600-400q0-17-11.5-28.5T560-440H400q-17 0-28.5 11.5T360-400q0 17 11.5 28.5T400-360ZM240-640q-17 0-28.5-11.5T200-680q0-17 11.5-28.5T240-720h480q17 0 28.5 11.5T760-680q0 17-11.5 28.5T720-640H240Zm80-120q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760H320Zm-53 560h426-426Z"/></svg>,
        prescription: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m678-134 46-46-64-64-46 46q-14 14-14 32t14 32q14 14 32 14t32-14Zm102-102 46-46q14-14 14-32t-14-32q-14-14-32-14t-32 14l-46 46 64 64ZM735-77q-37 37-89 37t-89-37q-37-37-37-89t37-89l148-148q37-37 89-37t89 37q37 37 37 89t-37 89L735-77ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v245q-20-5-40-5t-40 3v-243H200v560h243q-3 20-3 40t5 40H200Zm280-670q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM280-600v-80h400v80H280Zm0 160v-80h400v34q-8 5-15.5 11.5T649-460l-20 20H280Zm0 160v-80h269l-49 49q-8 8-14.5 15.5T474-280H280Z"/></svg>,
        alarm: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>,
        date_range: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>,
        copy: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
    }

    return icons[props.name] || null;
}