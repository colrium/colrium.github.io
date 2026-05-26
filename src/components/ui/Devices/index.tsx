/** @format */

const Devices = ({ className }: { className?: string }) => {
	return (
		<div className={`devices flex items-center w-full justify-center text-lg h-100 m-auto ${className || ""}`}>
			<div className="device ">
				<div className="device_monitor_stand_y"></div>
				<div className="device_monitor_stand_x"></div>
				<div className="watch_strap_t"></div>
				<div className="watch_strap_b"></div>
				<div className="device_screen">
					<div className="device_home_btn"></div>
					<div className="device_watch_crown"></div>
				</div>
				<div className="device_shadow_a"></div>
				<div className="device_shadow_b"></div>
			</div>
		</div>
	);
};

export default Devices;
