import styles from "./ProfilePage.module.scss";
import image from "../../user.png";
function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={image}></img>
        <div className={styles.details}>
          <div className="input">
            <div>
            <div className="name">Name</div>
            <input type="text" placeholder="Enter your name" />
            </div>
            <div>
            <div className="name">Email</div>
            <input type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="input">
            <div className="name">Phone</div>
            <input type="phone" placeholder="Enter your phone no." />
            <div className="name">Address</div>
            <input type="address" placeholder="Enter your Address" />
          </div>
        </div>
        
      </div>
      <div className={`${styles.ball} ${styles.animation}`} />
      <div className={`${styles.ball2} ${styles.animation}`} />
      <div className={`${styles.ball3} ${styles.animation}`} />
    </div>
  );
}

export default ProfilePage;
