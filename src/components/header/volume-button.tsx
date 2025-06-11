import VolumeIcon from "../../assets/icons/volume";
import VolumeMuteIcon from "../../assets/icons/volume-mute";

function VolumeButton({
  isMuted,
  ...props
}: { isMuted: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <>{isMuted ? <VolumeMuteIcon {...props} /> : <VolumeIcon {...props} />}</>
  );
}

export default VolumeButton;
