import { useSoundContext } from "../../context/sound";
import VolumeIcon from "../../assets/icons/volume";
import VolumeMuteIcon from "../../assets/icons/volume-mute";

function VolumeButton(props: React.SVGProps<SVGSVGElement>) {
  const { isMuted, mute, unmute } = useSoundContext();

  return (
    <>
      {isMuted ? (
        <VolumeMuteIcon onClick={unmute} {...props} />
      ) : (
        <VolumeIcon onClick={mute} {...props} />
      )}
    </>
  );
}

export default VolumeButton;
