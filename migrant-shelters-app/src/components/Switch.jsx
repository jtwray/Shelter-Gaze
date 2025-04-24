import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
// import styles from './switch.module.css'
// import './switch.css'

export const Switcherooni = ({
    handleToggleSwitch,
    switchId,
    switchLabel,
    switchState
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            <label
                className="Label"
                htmlFor={switchId}
                style={{ paddingRight: 15, color: 'lime', }}
            >
                {switchLabel}{switchState}
            </label>
            <Switch.Root
                id={switchId}
                checked={switchState === 'any' ? 'checked' : 'unchecked'}
                onCheckedChange={handleToggleSwitch}
                className="SwitchRoot"
                style={{ backgroundColor: "black", height: "30px", width: "75px", borderRadius: "50px", padding: "5px", position: 'relative', marginLeft: "10px", border: "1px solid lime", left: 0 }}
            >
                <Switch.Thumb
                    style={{
                        height: "25px", width: "25px", borderRadius: "50px", backgroundColor: "lime",
                        left: `${switchState === 'any' ? '5px' : '50px'}`,

                        // transform: switchState === 'any' ? 'translateX(0)' : 'translateX(25px)',
                        position: 'absolute',
                        transition: "all 0.2s ease-in-out",
                    }}
                    className="SwitchThumb"
                />
            </Switch.Root>

            {/* <label
                className={Label}

                htmlFor={switchId}
                style={{ paddingRight: 15, color: 'lime', }}
            >
                {switchLabel}
            </label>
            <Switch.Root
                id={switchId}
                checked={switchState === 'any' ? 'checked' : 'unchecked'}
                onCheckedChange={handleToggleSwitch}
                className={SwitchRoot}
            >
                <Switch.Thumb
                    className={SwitchThumb}
                />
            </Switch.Root> */}
        </div>
        // <label htmlFor={switchId} className="flex space-x-4">
        //     <span className="font-medium">{switchLabel}</span>
        //     <Switch.Root
        //         id={switchId}
        //         checked={switchState}
        //         onCheckedChange={handleToggleSwitch}
        //         className="data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 w-11 rounded-full bg-gray-700 p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600"
        //     >
        //         <Switch.Thumb
        //             className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition"
        //         />
        //     </Switch.Root>
        // </label>


    );
}
export const ToggleSwitch = ({
    handleToggleSwitch,
    switchId,
    switchLabel,
    switchState
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            <label
                className="Label"
                htmlFor={switchId}
                style={{ paddingRight: 15, color: 'lime', }}
            >
                {switchLabel}{switchState}
            </label>
            <div onClick={handleToggleSwitch} className='switchroot'>
                <span className='switchthumb'></span>
            </div>
            <style>{`
:root{
  --switch-width:80px;
}
.switchroot {
  border-radius: 50px;
  height:calc(.5 * var(--switch-width));
  width:var(--switch-width);
  border: solid lime 3px;
  background: black;
  position:relative;
  box-sizing:content-box;
  
  transition:all .72s ease-in-out;
    &:active {
/*       border: solid 5px lime; */
      .switchthumb{
    left:calc(.5 * var(--switch-width));
    background:lime;
  }}
} 
.switchthumb {
 outline:solid black 3px;
/*   border:solid lime 1px; */
  
  height:calc(.5 * var(--switch-width));

  width:calc(.5 * var(--switch-width));
  display:block;
  border-radius: inherit;
  background: grey;
  left:${switchState === 'any' ? '0px' : 'calc(.5 * var(--switch-width))'}0px;
//   left:${switchState === 'any' ? '0px' : 'calc(.5 * var(--switch-width))'}0px;
  transition:all .72s ease-in-out;
  position:absolute;

 
}`}
            </style>
            {/* <label
                className={Label}

                htmlFor={switchId}
                style={{ paddingRight: 15, color: 'lime', }}
            >
                {switchLabel}
            </label>
            <Switch.Root
                id={switchId}
                checked={switchState === 'any' ? 'checked' : 'unchecked'}
                onCheckedChange={handleToggleSwitch}
                className={SwitchRoot}
            >
                <Switch.Thumb
                    className={SwitchThumb}
                />
            </Switch.Root> */}
        </div>
        // <label htmlFor={switchId} className="flex space-x-4">
        //     <span className="font-medium">{switchLabel}</span>
        //     <Switch.Root
        //         id={switchId}
        //         checked={switchState}
        //         onCheckedChange={handleToggleSwitch}
        //         className="data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 w-11 rounded-full bg-gray-700 p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600"
        //     >
        //         <Switch.Thumb
        //             className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition"
        //         />
        //     </Switch.Root>
        // </label>


    );
}
export const ToggleSwitch3 = ({
    handleToggleSwitch,
    switchId,
    switchLabel,
    switchState
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            <label
                className="Label"
                htmlFor={switchId}
                style={{ paddingRight: 15, color: 'lime', }}
            >
                {switchLabel}{switchState}
            </label>
            <div onClick={handleToggleSwitch} className={`switchroot ${switchState === 'any' && 'active '}`} >
                <span className='switchthumb'></span>
            </div>

            <style jsx>
                {`
                    :root{--switch-width:80px;}
                    .switchroot {
                        background: black;
                        border - radius: 50px;
                        border: solid lime 3px;
                        box-sizing:content-box;
                        height:calc(.5 * var(--switch-width));
                        position:relative;
                        transition:all .72s ease-in-out;
                        width:var(--switch-width);
                        &:active, &.active {
                            .switchthumb{
                                background:lime;
                                left:calc(.5 * var(--switch-width));
                            }
                        }
                    }
                    .switchthumb {
                        background: grey;
                        border-radius: inherit;
                        display:block;
                        height:calc(.5 * var(--switch-width));
                        left:0px;
                        outline:solid black 3px;
                        position:absolute;
                        transition:all .72s ease-in-out;
                        width:calc(.5 * var(--switch-width));
                    }
                    `}
            </style>

        </div>

    );
}

export const Switcheroonical = ({
    handleToggleSwitch,
    switchId,
    switchLabel,
    switchState
}) => {
    return (
        <div className="flex items-center">
            <label htmlFor={switchId} className="flex space-x-4">
                <span className="font-medium">{switchLabel}</span>
                <Switch.Root id={switchId}
                    checked={switchState}
                    onCheckedChange={handleToggleSwitch}
                    className="data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 w-11 rounded-full bg-gray-700 p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600"
                >
                    <Switch.Thumb
                        className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition"
                    />
                </Switch.Root>
            </label>
        </div >

    );
}

export const Switcheroonie = ({ handleToggleSwitch, switchState, switchLabel }) => {
    return (

        <div className="flex items-center">
            <Switch.Root
            // className="data-[state=checked]:bg-green-500 h-5 w-11 rounded-full bg-lime-500 border-gray-300 bg-lime-500 shadow-sm shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600"
            >
                <Switch.Thumb
                    className="block h-5 w-5 rounded-full bg-lime blue border-red-1" />
                {/* className="data-[state=checked]:translate-x-6 block h-5 w-5 rounded-full bg-white" /> */}
            </Switch.Root>
            {/* <label
                    className="pr-[15px] text-[15px] leading-none text-white"
                    htmlFor="matchAny"
                >
                    {switchLabel}
                </label> */}
            {/* <Switch.Root
                    checked={switchState}
                    onCheckedChange={handleToggleSwitch}
                    // data-state={switchState === true ? 'checked' : 'unchecked'}
                    className="relative h-[25px] w-[42px] cursor-default rounded-full bg-blackA6 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
                    id="airplane-mode"
                    style={{
                        //  "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" 
                        "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)"

                    }}
                >
                    <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root> */}
        </div>);
}