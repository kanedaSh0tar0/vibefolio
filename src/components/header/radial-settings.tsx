import { useState } from "react";
import { ControlButton, RadialButton, SettingsButtonContainer } from "./styles";
import VolumeButton from "./volume-button";
import SettingsIcon from "../../assets/icons/settings";
import CloseFolder from "../../assets/icons/close-folder";
import Brush from "../../assets/icons/brush";
import { useAppDispatch } from "../../store/hooks";
import { useSoundContext } from "../../context/sound";
import { closeAllModals, openModal } from "../../store/modalSlice";

function RadialSettings() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isMuted, mute, unmute } = useSoundContext();

  const radius = 2;

  const handleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const handleCloseAll = () => {
    dispatch(closeAllModals());
    setOpen(false);
  };

  const handleWallpaper = () => {
    dispatch(openModal("settings"));
    setOpen(false);
  };

  const actions = [
    {
      icon: <CloseFolder />,
      angle: -180,
      label: "Mute",
      onClick: handleCloseAll,
    },
    {
      icon: <VolumeButton isMuted={isMuted} />,
      angle: -225,
      label: "Close All",
      onClick: handleMute,
    },
    {
      icon: <Brush />,
      angle: -270,
      label: "Wallpaper",
      onClick: handleWallpaper,
    },
  ];

  return (
    <ControlButton isOpen={open}>
      <SettingsButtonContainer
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SettingsIcon />
      </SettingsButtonContainer>

      {actions.map(({ icon, angle, label, onClick }, index) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <RadialButton
            className="cursor-pointer"
            key={label}
            x={x}
            y={y}
            visible={open}
            index={index}
            onClick={onClick}
          >
            {icon}
          </RadialButton>
        );
      })}
    </ControlButton>
  );
}

export default RadialSettings;
