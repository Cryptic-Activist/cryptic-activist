import styles from './page.module.scss';

const TradingFees = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Trading Fees</h1>
      <p className={styles.description}>
        Our fee structure is designed to be transparent and competitive. Below
        you&apos;ll find details on the various fees that apply when trading on
        our platform. All fees are subject to change with notice.
      </p>

      <table className={styles.feesTable}>
        <thead>
          <tr>
            <th>Fee Type</th>
            <th>Description</th>
            <th>Fee Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maker Fee</td>
            <td>
              Applies when you create an order that adds liquidity to the
              market.
            </td>
            <td>0.15%</td>
          </tr>
          <tr>
            <td>Taker Fee</td>
            <td>
              Charged when you accept an order that removes liquidity from the
              market.
            </td>
            <td>0.25%</td>
          </tr>
          <tr>
            <td>Escrow Fee</td>
            <td>
              Deducted from the crypto held in escrow during a trade, ensuring
              security.
            </td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>Withdrawal Fee</td>
            <td>
              Applied when withdrawing funds from the platform. The fee may vary
              based on the withdrawal method.
            </td>
            <td>$X or Y%</td>
          </tr>
          <tr>
            <td>Vendor Premium Fee</td>
            <td>
              Verified vendors and high-volume traders enjoy discounted fees.
              For example, if your monthly trading volume exceeds $100,000, you
              could receive up to a <strong>20% discount</strong> on Maker Fees
              and a <strong>25% discount</strong> on Taker Fees.
            </td>
            <td>Varies (Discounted Rate)</td>
          </tr>
        </tbody>
      </table>

      <section className={styles.additionalInfo}>
        <h2>Additional Information</h2>
        <p>
          Please note that fees may vary based on trade volume, current market
          conditions, and any special promotions. We encourage all users to
          review this fee schedule frequently and contact our support team if
          you have any questions regarding fees.
        </p>
      </section>
    </div>
  );
};

export default TradingFees;
