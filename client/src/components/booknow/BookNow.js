import React, { Component } from 'react'
import styles from './BookNow.module.css'
class BookNow extends Component {
  render() {
    return (
      <div className={styles.maincontainer}>
        <h2>Movie:</h2>
        <select id="movie">
        <option value="220">Bhool Bhulaiya</option>
        <option value="320">--</option>
        <option value="250">--</option>
        <option value="260">--</option>
      </select>
        <div className={styles.screen}></div>
            <div className={styles.showcase}>
              <ul>
                <li>
                <div className={styles.seat}></div>
                <small>N/A</small>
                </li>
                <li>
                <div className={styles.seat}></div>
                <small>Selected</small>
                </li>
                <li>
                <div className={styles.seat}></div>
                <small>Booked</small>
                </li>
              </ul>
            </div>
        <div className={styles.row}>
          <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.row}>
        <div className={styles.seat}>A1</div>
          <div className={styles.seat}>A2</div>
          <div className={styles.seat}>A3</div>
          <div className={styles.seat}>A4</div>
          <div className={styles.seat}>A5</div>
          <div className={styles.seat}>A6</div>
          <div className={styles.seat}>A7</div>
          <div className={styles.seat}>A8</div>
          <div className={styles.seat}>A9</div>
          <div className={styles.seat}>A10</div>
        </div>
        <div className={styles.booknow_Btn}><button>Book Now</button></div>
      </div>
    )
  }
}
export default BookNow